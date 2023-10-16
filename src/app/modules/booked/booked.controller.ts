import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { IBooked } from "./booked.interface";
import { bookedFilterableField } from "./booked.constant";
import { paginationField } from "../../constant/pagination";
import { BookedService } from "./booked.service";
import httpStatus from "../../../shared/httpStatus";
import { JwtPayload } from "jsonwebtoken";

const createBooked = catchAsync(async (req: Request, res: Response) => {
  const result = await BookedService.createBookedService(req.body);

  sendResponse<IBooked>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully booked seat",
    data: result,
  });
});

const getBooked = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, bookedFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await BookedService.getBookedService(
    filterData,
    paginationOptions,
  );

  sendResponse<IBooked[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived all booked information",
    meta: result.meta,
    data: result.data,
  });
});

const getMyBooked = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;

  const filterData: Filter = pick(req.query, bookedFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await BookedService.getMyBookedService(
    filterData,
    paginationOptions,
    userId,
  );

  sendResponse<IBooked[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived my booked information",
    meta: result?.meta,
    data: result?.data,
  });
});

const getBookedById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookedService.getBookedByIdService(id);
  sendResponse<IBooked>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived booked information with id",
    data: result,
  });
});

const updateBookedById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookedService.updateBookedByIdService(id, req.body);
  sendResponse<IBooked>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated booked information with id",
    data: result,
  });
});

const deleteBookedById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookedService.deleteBookedByIdService(id);
  sendResponse<IBooked>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted booked information with id",
    data: result,
  });
});

export const BookedController = {
  createBooked,
  getBooked,
  getBookedById,
  updateBookedById,
  deleteBookedById,
  getMyBooked,
};
