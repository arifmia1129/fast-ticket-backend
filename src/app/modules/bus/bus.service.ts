import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import { IBus } from "./bus.interface";
import httpStatus from "../../../shared/httpStatus";
import ApiError from "../../../errors/ApiError";
import Bus from "./bus.model";
import { busSearchableField } from "./bus.constant";
import BusOwner from "../busOwner/busOwner.model";
import { JwtPayload } from "jsonwebtoken";
import Passenger from "../passenger/passenger.model";

const createBusService = async (payload: IBus): Promise<IBus | null> => {
  const isBusOwnerExist = await BusOwner.findById(payload.owner);

  if (!isBusOwnerExist) {
    throw new ApiError(
      "Bus owner not found with given id",
      httpStatus.NOT_FOUND,
    );
  }

  return await Bus.create(payload);
};

const getBusService = async (
  filters: Filter,
  paginationOptions: Pagination,
  payload: JwtPayload,
): Promise<ResponseWithPagination<IBus[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const { searchTerm, ...filtersData } = filters;

  const { userId, role } = payload || {};

  const andCondition = [];

  if (role === "bus_owner") {
    const ownerInfo = await BusOwner.findOne({
      id: userId,
    });

    if (ownerInfo) {
      andCondition.push({
        owner: ownerInfo._id,
      });
    }
  }

  if (searchTerm) {
    andCondition.push({
      $or: busSearchableField.map(field => ({
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

  const res = await Bus.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  if (!res.length) {
    throw new ApiError("No bus found", httpStatus.NOT_FOUND);
  }

  const total = await Bus.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getBusByIdService = async (id: string): Promise<IBus | null> => {
  const res = await Bus.findById(id);

  if (!res) {
    throw new ApiError("No bus found with given ID", httpStatus.NOT_FOUND);
  }

  return res;
};

const updateBusByIdService = async (
  id: string,
  payload: Partial<IBus>,
): Promise<IBus | null> => {
  const res = await Bus.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return res;
};

const addBusReviewByIdService = async (
  busId: string,
  userId: string,
  payload: {
    review: string;
    rating: string;
  },
): Promise<IBus | null> => {
  const isExist = await Bus.findById(busId);

  if (!isExist) {
    throw new ApiError(`Could not find the bus with id`, httpStatus.NOT_FOUND);
  }

  const passenger = await Passenger.findOne({ id: userId });

  if (!passenger) {
    throw new ApiError(
      `Could not find the passenger with id`,
      httpStatus.NOT_FOUND,
    );
  }

  const review = {
    name: passenger.name.firstName + " " + passenger.name.lastName,
    review: payload.review,
    rating: payload.rating,
  };

  isExist?.review?.push(review);

  await isExist.save();

  return isExist;
};

const deleteBusByIdService = async (id: string): Promise<IBus | null> => {
  const res = await Bus.findByIdAndDelete(id);

  if (!res) {
    throw new ApiError("Failed to delete bus", httpStatus.BAD_REQUEST);
  }

  return res;
};

export const BusService = {
  createBusService,
  getBusService,
  getBusByIdService,
  updateBusByIdService,
  deleteBusByIdService,
  addBusReviewByIdService,
};
