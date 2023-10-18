/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import { IBlog } from "./blog.interface";
import httpStatus from "../../../shared/httpStatus";
import ApiError from "../../../errors/ApiError";
import Blog from "./blog.model";
import { blogSearchableField } from "./blog.constant";

const createBlogService = async (payload: any): Promise<IBlog | null> => {
  return await Blog.create(payload);
};

const getBlogService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IBlog[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const { searchTerm, date, ...filtersData } = filters;

  const andCondition = [];

  if (date) {
    // Ensure date is treated as an array of strings
    const dates = (Array.isArray(date) ? date : [date]) as string[];

    const dateConditions = dates
      .map(dateStr => new Date(dateStr))
      .filter(date => !isNaN(date.getTime()));

    if (dateConditions.length > 0) {
      andCondition.push({ date: { $in: dateConditions } });
    }
  }

  if (searchTerm) {
    andCondition.push({
      $or: blogSearchableField.map(field => ({
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

  const res = await Blog.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  if (!res.length) {
    throw new ApiError("No Blog found", httpStatus.NOT_FOUND);
  }

  const total = await Blog.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getBlogByIdService = async (id: string): Promise<IBlog | null> => {
  const res = await Blog.findById(id);

  if (!res) {
    throw new ApiError("No Blog found with given ID", httpStatus.NOT_FOUND);
  }

  return res;
};

const updateBlogByIdService = async (
  id: string,
  payload: Partial<IBlog>,
): Promise<IBlog | null> => {
  const res = await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return res;
};

const deleteBlogByIdService = async (id: string): Promise<IBlog | null> => {
  const res = await Blog.findByIdAndDelete(id);

  if (!res) {
    throw new ApiError("Failed to delete Blog", httpStatus.BAD_REQUEST);
  }

  return res;
};

export const BlogService = {
  createBlogService,
  getBlogService,
  getBlogByIdService,
  updateBlogByIdService,
  deleteBlogByIdService,
};
