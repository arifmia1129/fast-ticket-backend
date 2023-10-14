import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { IAdmin } from "./admin.interface";
import { adminFilterableField } from "./admin.constant";
import { AdminService } from "./admin.service";
import httpStatus from "../../../shared/httpStatus";

const getAdmin = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, adminFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await AdminService.getAdminService(
    filterData,
    paginationOptions,
  );

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived all admin information",
    meta: result.meta,
    data: result.data,
  });
});

const getAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.getAdminByIdService(id);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved admin information by id",
    data: result,
  });
});

const updateAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AdminService.updateAdminByIdService(id, req.body);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated admin information with id",
    data: result,
  });
});

const deleteAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.deleteAdminByIdService(id);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted admin with id",
    data: result,
  });
});

export const AdminController = {
  getAdmin,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
