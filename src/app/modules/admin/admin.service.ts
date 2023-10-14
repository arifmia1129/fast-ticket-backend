/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Filter,
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { IAdmin } from "./admin.interface";
import Admin from "./admin.model";
import { adminSearchableField } from "./admin.constant";
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";
import User from "../user/user.model";
import { IName } from "../../../interfaces/common.interface";

const getAdminService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IAdmin[]>> => {
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
      $or: adminSearchableField.map(field => ({
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
        [field]: value,
      })),
    });
  }

  const whereConditions = andCondition.length ? { $and: andCondition } : {};

  const res = await Admin.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  if (!res.length) {
    throw new ApiError("No admin found", httpStatus.NOT_FOUND);
  }

  const total = await Admin.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getAdminByIdService = async (id: string): Promise<IAdmin | null> => {
  const res = await Admin.findById(id);

  if (!res) {
    throw new ApiError("No admin found with given ID", httpStatus.NOT_FOUND);
  }

  return res;
};

const updateAdminByIdService = async (
  id: string,
  payload: Partial<IAdmin>,
): Promise<IAdmin | null> => {
  const isExist = await Admin.findById(id);

  if (!isExist) {
    throw new ApiError("Admin not found with given id", httpStatus.NOT_FOUND);
  }

  const { name, ...adminInfo } = payload;

  const updateInfo: Partial<IAdmin> = { ...adminInfo };

  //   name object
  if (name && Object.keys(name).length > 0) {
    const nameKeys = Object.keys(name);
    nameKeys.forEach(key => {
      const nameKey = `name.${key}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updateInfo as any)[nameKey] = name[key as keyof IName];
    });
  }

  const res = await Admin.findOneAndUpdate({ _id: id }, updateInfo, {
    new: true,
  });

  return res;
};

const deleteAdminByIdService = async (id: string): Promise<IAdmin | null> => {
  const session = await mongoose.startSession();

  let res;

  try {
    session.startTransaction();
    const adminInfo = await Admin.findOneAndDelete({ _id: id });

    if (!adminInfo) {
      throw new ApiError("Failed to delete admin", httpStatus.BAD_REQUEST);
    }

    res = adminInfo;

    const user = await User.deleteOne({ admin: id });

    if (!user) {
      throw new ApiError("Failed to delete user", httpStatus.BAD_REQUEST);
    }

    session.commitTransaction();
    session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }

  return res;
};

export const AdminService = {
  getAdminService,
  getAdminByIdService,
  updateAdminByIdService,
  deleteAdminByIdService,
};
