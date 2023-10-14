/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import { ITrip } from "./trip.interface";
import httpStatus from "../../../shared/httpStatus";
import ApiError from "../../../errors/ApiError";
import Trip from "./trip.model";
import { tripSearchableField } from "./trip.constant";
import Bus from "../bus/bus.model";

const createTripService = async (payload: any): Promise<ITrip | null> => {
  const isBusExist = await Bus.findById(payload.bus);

  if (!isBusExist) {
    throw new ApiError(
      "Bus information not found with given id",
      httpStatus.NOT_FOUND,
    );
  }

  const { totalSeat, ...tripInfo } = payload;

  const seats = [];

  for (let seat = 1; seat <= totalSeat; seat++) {
    seats.push({
      seat,
      status: "available",
    });
  }

  tripInfo.seats = seats;

  return await Trip.create(tripInfo);
};

const getTripService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<ITrip[]>> => {
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
      $or: tripSearchableField.map(field => ({
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

  const res = await Trip.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  if (!res.length) {
    throw new ApiError("No trip found", httpStatus.NOT_FOUND);
  }

  const total = await Trip.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getTripByIdService = async (id: string): Promise<ITrip | null> => {
  const res = await Trip.findById(id);

  if (!res) {
    throw new ApiError("No trip found with given ID", httpStatus.NOT_FOUND);
  }

  return res;
};

const updateTripByIdService = async (
  id: string,
  payload: Partial<ITrip>,
): Promise<ITrip | null> => {
  const res = await Trip.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return res;
};

const deleteTripByIdService = async (id: string): Promise<ITrip | null> => {
  const res = await Trip.findByIdAndDelete(id);

  if (!res) {
    throw new ApiError("Failed to delete trip", httpStatus.BAD_REQUEST);
  }

  return res;
};

export const TripService = {
  createTripService,
  getTripService,
  getTripByIdService,
  updateTripByIdService,
  deleteTripByIdService,
};
