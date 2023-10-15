import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import { IPermission } from "./permission.interface";
import Permission from "./permission.model";
import { permissionSearchableField } from "./permission.constant";
import httpStatus from "../../../shared/httpStatus";
import ApiError from "../../../errors/ApiError";

const createPermissionService = async (
  palyload: IPermission,
): Promise<IPermission | null> => {
  return await Permission.create(palyload);
};

const getPermissionService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IPermission[]>> => {
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
      $or: permissionSearchableField.map(field => ({
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

  const res = await Permission.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  if (!res.length) {
    throw new ApiError("No permission found", httpStatus.NOT_FOUND);
  }

  const total = await Permission.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getPermissionByIdService = async (
  id: string,
): Promise<IPermission | null> => {
  const res = await Permission.findById(id);

  if (!res) {
    throw new ApiError(
      "No permission found with given ID",
      httpStatus.NOT_FOUND,
    );
  }

  return res;
};

const updatePermissionByIdService = async (
  id: string,
  payload: Partial<IPermission>,
): Promise<IPermission | null> => {
  const res = await Permission.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return res;
};

const deletePermissionByIdService = async (
  id: string,
): Promise<IPermission | null> => {
  const res = await Permission.findByIdAndDelete(id);

  if (!res) {
    throw new ApiError("Failed to delete permission", httpStatus.BAD_REQUEST);
  }

  return res;
};

export const PermissionService = {
  createPermissionService,
  getPermissionService,
  getPermissionByIdService,
  updatePermissionByIdService,
  deletePermissionByIdService,
};
