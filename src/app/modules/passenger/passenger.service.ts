/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Filter,
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { IPassenger } from "./passenger.interface";
import Passenger from "./passenger.model";
import { passengerSearchableField } from "./passenger.constant";
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";
import User from "../user/user.model";
import { IName } from "../../../interfaces/common.interface";

const getPassengerService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IPassenger[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: passengerSearchableField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: new RegExp(
            typeof value === "string" ? value : String(value),
            "i",
          ),
        },
      })),
    });
  }

  const whereConditions = andCondition.length ? { $and: andCondition } : {};

  const res = await Passenger.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  if (!res.length) {
    throw new ApiError("No passenger found", httpStatus.NOT_FOUND);
  }

  const total = await Passenger.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getPassengerByIdService = async (
  id: string,
): Promise<IPassenger | null> => {
  const res = await Passenger.findById(id);

  if (!res) {
    throw new ApiError(
      "No passenger found with given ID",
      httpStatus.NOT_FOUND,
    );
  }

  return res;
};

const updatePassengerByIdService = async (
  id: string,
  payload: Partial<IPassenger>,
): Promise<IPassenger | null> => {
  const isExist = await Passenger.findById(id);

  if (!isExist) {
    throw new ApiError(
      "Passenger not found with given id",
      httpStatus.NOT_FOUND,
    );
  }

  const { name, ...PassengerInfo } = payload;

  const updateInfo: Partial<IPassenger> = { ...PassengerInfo };

  //   name object
  if (name && Object.keys(name).length > 0) {
    const nameKeys = Object.keys(name);
    nameKeys.forEach(key => {
      const nameKey = `name.${key}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updateInfo as any)[nameKey] = name[key as keyof IName];
    });
  }

  const res = await Passenger.findOneAndUpdate({ _id: id }, updateInfo, {
    new: true,
  });

  return res;
};

const deletePassengerByIdService = async (
  id: string,
): Promise<IPassenger | null> => {
  const session = await mongoose.startSession();

  let res;

  try {
    session.startTransaction();
    const passengerInfo = await Passenger.findOneAndDelete({ _id: id });

    if (!passengerInfo) {
      throw new ApiError("Failed to delete passenger", httpStatus.BAD_REQUEST);
    }

    res = passengerInfo;

    const user = await User.deleteOne({ passenger: id });

    if (!user) {
      throw new ApiError("Failed to delete user", httpStatus.BAD_REQUEST);
    }

    session.commitTransaction();
    session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }

  return res;
};

export const PassengerService = {
  getPassengerService,
  getPassengerByIdService,
  updatePassengerByIdService,
  deletePassengerByIdService,
};
