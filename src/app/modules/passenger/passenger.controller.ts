import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { IPassenger } from "./passenger.interface";
import { passengerFilterableField } from "./passenger.constant";
import { PassengerService } from "./passenger.service";
import httpStatus from "../../../shared/httpStatus";

const getPassenger = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, passengerFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await PassengerService.getPassengerService(
    filterData,
    paginationOptions,
  );

  sendResponse<IPassenger[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived all passenger information",
    meta: result.meta,
    data: result.data,
  });
});

const getPassengerById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PassengerService.getPassengerByIdService(id);
  sendResponse<IPassenger>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved passenger information by id",
    data: result,
  });
});

const updatePassengerById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await PassengerService.updatePassengerByIdService(
    id,
    req.body,
  );
  sendResponse<IPassenger>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated passenger information with id",
    data: result,
  });
});

const deletePassengerById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PassengerService.deletePassengerByIdService(id);
  sendResponse<IPassenger>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted passenger with id",
    data: result,
  });
});

export const PassengerController = {
  getPassenger,
  getPassengerById,
  updatePassengerById,
  deletePassengerById,
};
