import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { IBus } from "./bus.interface";
import { busFilterableField } from "./bus.constant";
import { paginationField } from "../../constant/pagination";
import { BusService } from "./bus.service";
import httpStatus from "../../../shared/httpStatus";

const createBus = catchAsync(async (req: Request, res: Response) => {
  const result = await BusService.createBusService(req.body);

  sendResponse<IBus>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully created bus",
    data: result,
  });
});

const getBus = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, busFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await BusService.getBusService(filterData, paginationOptions);

  sendResponse<IBus[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived all bus",
    meta: result.meta,
    data: result.data,
  });
});

const getBusById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BusService.getBusByIdService(id);
  sendResponse<IBus>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived bus with id",
    data: result,
  });
});

const updateBusById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BusService.updateBusByIdService(id, req.body);
  sendResponse<IBus>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated bus with id",
    data: result,
  });
});

const deleteBusById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BusService.deleteBusByIdService(id);
  sendResponse<IBus>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted bus with id",
    data: result,
  });
});

export const BusController = {
  createBus,
  getBus,
  getBusById,
  updateBusById,
  deleteBusById,
};
