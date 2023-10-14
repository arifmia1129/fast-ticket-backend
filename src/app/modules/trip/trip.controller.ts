import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { ITrip } from "./trip.interface";
import { tripFilterableField } from "./trip.constant";
import { paginationField } from "../../constant/pagination";
import { TripService } from "./trip.service";
import httpStatus from "../../../shared/httpStatus";

const createTrip = catchAsync(async (req: Request, res: Response) => {
  const result = await TripService.createTripService(req.body);

  sendResponse<ITrip>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully created trip",
    data: result,
  });
});

const getTrip = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, tripFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await TripService.getTripService(
    filterData,
    paginationOptions,
  );

  sendResponse<ITrip[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived all trip",
    meta: result.meta,
    data: result.data,
  });
});

const getTripById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TripService.getTripByIdService(id);
  sendResponse<ITrip>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived trip with id",
    data: result,
  });
});

const updateTripById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TripService.updateTripByIdService(id, req.body);
  sendResponse<ITrip>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated trip with id",
    data: result,
  });
});

const deleteTripById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TripService.deleteTripByIdService(id);
  sendResponse<ITrip>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted trip with id",
    data: result,
  });
});

export const TripController = {
  createTrip,
  getTrip,
  getTripById,
  updateTripById,
  deleteTripById,
};
