/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Filter,
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { IBusOwner } from "./busOwner.interface";
import BusOwner from "./busOwner.model";
import { busOwnerSearchableField } from "./busOwner.constant";
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";
import User from "../user/user.model";
import { IName } from "../../../interfaces/common.interface";

const getBusOwnerService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IBusOwner[]>> => {
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
      $or: busOwnerSearchableField.map(field => ({
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
        [field]: value,
      })),
    });
  }

  const whereConditions = andCondition.length ? { $and: andCondition } : {};

  const res = await BusOwner.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  if (!res.length) {
    throw new ApiError("No bus owner found", httpStatus.NOT_FOUND);
  }

  const total = await BusOwner.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getBusOwnerByIdService = async (
  id: string,
): Promise<IBusOwner | null> => {
  const res = await BusOwner.findById(id);

  if (!res) {
    throw new ApiError(
      "No bus owner found with given ID",
      httpStatus.NOT_FOUND,
    );
  }

  return res;
};

const updateBusOwnerByIdService = async (
  id: string,
  payload: Partial<IBusOwner>,
): Promise<IBusOwner | null> => {
  const isExist = await BusOwner.findById(id);

  if (!isExist) {
    throw new ApiError(
      "Bus owner not found with given id",
      httpStatus.NOT_FOUND,
    );
  }

  const { name, ...BusOwnerInfo } = payload;

  const updateInfo: Partial<IBusOwner> = { ...BusOwnerInfo };

  //   name object
  if (name && Object.keys(name).length > 0) {
    const nameKeys = Object.keys(name);
    nameKeys.forEach(key => {
      const nameKey = `name.${key}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updateInfo as any)[nameKey] = name[key as keyof IName];
    });
  }

  const res = await BusOwner.findOneAndUpdate({ _id: id }, updateInfo, {
    new: true,
  });

  return res;
};

const deleteBusOwnerByIdService = async (
  id: string,
): Promise<IBusOwner | null> => {
  const session = await mongoose.startSession();

  let res;

  try {
    session.startTransaction();
    const busOwnerInfo = await BusOwner.findOneAndDelete({ _id: id });

    if (!busOwnerInfo) {
      throw new ApiError("Failed to delete bus owner", httpStatus.BAD_REQUEST);
    }

    res = busOwnerInfo;

    const user = await User.deleteOne({ busOwner: id });

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

export const BusOwnerService = {
  getBusOwnerService,
  getBusOwnerByIdService,
  updateBusOwnerByIdService,
  deleteBusOwnerByIdService,
};
