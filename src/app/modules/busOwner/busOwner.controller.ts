import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { IBusOwner } from "./busOwner.interface";
import { busOwnerFilterableField } from "./busOwner.constant";
import { BusOwnerService } from "./busOwner.service";
import httpStatus from "../../../shared/httpStatus";

const getBusOwner = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, busOwnerFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await BusOwnerService.getBusOwnerService(
    filterData,
    paginationOptions,
  );

  sendResponse<IBusOwner[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived all bus owner information",
    meta: result.meta,
    data: result.data,
  });
});

const getBusOwnerById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BusOwnerService.getBusOwnerByIdService(id);
  sendResponse<IBusOwner>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved bus owner information by id",
    data: result,
  });
});

const updateBusOwnerById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BusOwnerService.updateBusOwnerByIdService(id, req.body);
  sendResponse<IBusOwner>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated bus owner information with id",
    data: result,
  });
});

const deleteBusOwnerById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BusOwnerService.deleteBusOwnerByIdService(id);
  sendResponse<IBusOwner>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted bus owner with id",
    data: result,
  });
});

export const BusOwnerController = {
  getBusOwner,
  getBusOwnerById,
  updateBusOwnerById,
  deleteBusOwnerById,
};
