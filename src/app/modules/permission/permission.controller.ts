import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { IPermission } from "./permission.interface";
import { permissionFilterableField } from "./permission.constant";
import { paginationField } from "../../constant/pagination";
import { PermissionService } from "./permission.service";
import httpStatus from "../../../shared/httpStatus";

const createPermission = catchAsync(async (req: Request, res: Response) => {
  const result = await PermissionService.createPermissionService(req.body);

  sendResponse<IPermission>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully created permission",
    data: result,
  });
});

const getPermission = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, permissionFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await PermissionService.getPermissionService(
    filterData,
    paginationOptions,
  );

  sendResponse<IPermission[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived all permissions",
    meta: result.meta,
    data: result.data,
  });
});

const getPermissionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PermissionService.getPermissionByIdService(id);
  sendResponse<IPermission>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived permission with id",
    data: result,
  });
});

const updatePermissionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PermissionService.updatePermissionByIdService(
    id,
    req.body,
  );
  sendResponse<IPermission>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated permission with id",
    data: result,
  });
});

const deletePermissionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PermissionService.deletePermissionByIdService(id);
  sendResponse<IPermission>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted permission with id",
    data: result,
  });
});

export const PermissionController = {
  createPermission,
  getPermission,
  getPermissionById,
  updatePermissionById,
  deletePermissionById,
};
