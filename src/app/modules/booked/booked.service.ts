/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import { IBooked } from "./booked.interface";
import httpStatus from "../../../shared/httpStatus";
import ApiError from "../../../errors/ApiError";
import Booked from "./booked.model";
import { bookedSearchableField } from "./booked.constant";
import Passenger from "../passenger/passenger.model";
import Trip from "../trip/trip.model";

const createBookedService = async (
  payload: IBooked,
): Promise<IBooked | null> => {
  const { seat, passenger, trip } = payload;
  const isPassengerExist = await Passenger.findById(passenger);

  if (!isPassengerExist) {
    throw new ApiError(
      "Passenger not found with given id",
      httpStatus.NOT_FOUND,
    );
  }

  const isTripExist = await Trip.findById(trip);

  if (!isTripExist) {
    throw new ApiError("Trip not found with given id", httpStatus.NOT_FOUND);
  }

  const seatInfo = await Trip.findOne(
    {
      seats: { $elemMatch: { _id: seat } },
    },
    {
      "seats.$": 1,
    },
  );

  const isSeatAvailable = seatInfo?.seats[0].status === "available";

  if (!isSeatAvailable) {
    throw new ApiError("Seat not available", httpStatus.BAD_REQUEST);
  }

  await Trip.findOneAndUpdate(
    { _id: trip, "seats._id": seat },
    {
      $set: {
        "seats.$.status": "booked",
      },
    },
    {
      new: true,
    },
  );

  return await Booked.create(payload);
};

const getBookedService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IBooked[]>> => {
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
      $or: bookedSearchableField.map(field => ({
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

  const res = await Booked.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  if (!res.length) {
    throw new ApiError("No Booked found", httpStatus.NOT_FOUND);
  }

  const total = await Booked.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getMyBookedService = async (
  filters: Filter,
  paginationOptions: Pagination,
  userId: string,
): Promise<ResponseWithPagination<IBooked[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  const passenger = await Passenger.findOne({ id: userId });

  if (passenger) {
    andCondition.push({
      passenger: passenger._id,
    });
  }

  if (searchTerm) {
    andCondition.push({
      $or: bookedSearchableField.map(field => ({
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

  const res = await Booked.find(whereConditions)
    .populate("passenger")
    .populate({
      path: "trip",
      select: { seats: 0 },
      populate: {
        path: "bus",
      },
    })
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  async function findSeats() {
    for (const data of res) {
      const seatObjectId = new mongoose.Types.ObjectId(data.seat);

      const trip = await Trip.findOne({ "seats._id": seatObjectId });

      if (trip) {
        const mySeat = trip.seats.find((seat: any) =>
          seat._id.equals(seatObjectId),
        );
        if (mySeat) {
          data.seat = mySeat.seat; // Add the seat data to the Booked document
        }
      }
    }
  }

  await findSeats();
  if (!res.length) {
    throw new ApiError("No Booked found", httpStatus.NOT_FOUND);
  }

  const total = await Booked.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getBookedByIdService = async (id: string): Promise<IBooked | null> => {
  const res = await Booked.findById(id);

  if (!res) {
    throw new ApiError("No Booked found with given ID", httpStatus.NOT_FOUND);
  }

  return res;
};

const updateBookedByIdService = async (
  id: string,
  payload: Partial<IBooked>,
): Promise<IBooked | null> => {
  const isExist = await Booked.findById(id);

  if (!isExist) {
    throw new ApiError(
      "No booked information found with given ID",
      httpStatus.NOT_FOUND,
    );
  }

  if (isExist.status === "cancelled") {
    throw new ApiError("Booked has been cancelled", httpStatus.BAD_REQUEST);
  }

  const { status } = payload;

  if (status === "cancelled") {
    await Trip.findOneAndUpdate(
      { _id: isExist.trip, "seats._id": isExist.seat },
      {
        $set: {
          "seats.$.status": "available",
        },
      },
      {
        new: true,
      },
    );
  }

  const res = await Booked.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return res;
};

const deleteBookedByIdService = async (id: string): Promise<IBooked | null> => {
  const isExist = await Booked.findById(id);

  if (!isExist) {
    throw new ApiError(
      "No booked information found with given ID",
      httpStatus.NOT_FOUND,
    );
  }

  if (isExist.status === "cancelled") {
    throw new ApiError("Booked has been cancelled", httpStatus.BAD_REQUEST);
  }
  if (isExist.status === "accepted") {
    throw new ApiError("Booked has been accepted", httpStatus.BAD_REQUEST);
  }

  await Trip.findOneAndUpdate(
    { _id: isExist.trip, "seats._id": isExist.seat },
    {
      $set: {
        "seats.$.status": "available",
      },
    },
    {
      new: true,
    },
  );

  const res = await Booked.findByIdAndDelete(id);

  if (!res) {
    throw new ApiError(
      "Failed to delete booked information",
      httpStatus.BAD_REQUEST,
    );
  }

  return res;
};

export const BookedService = {
  createBookedService,
  getBookedService,
  getBookedByIdService,
  updateBookedByIdService,
  deleteBookedByIdService,
  getMyBookedService,
};
