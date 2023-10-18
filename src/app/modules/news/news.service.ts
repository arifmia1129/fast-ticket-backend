/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import { INews } from "./news.interface";
import httpStatus from "../../../shared/httpStatus";
import ApiError from "../../../errors/ApiError";
import News from "./news.model";
import { newsSearchableField } from "./news.constant";

const createNewsService = async (payload: any): Promise<INews | null> => {
  return await News.create(payload);
};

const getNewsService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<INews[]>> => {
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
      $or: newsSearchableField.map(field => ({
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

  const res = await News.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  if (!res.length) {
    throw new ApiError("No News found", httpStatus.NOT_FOUND);
  }

  const total = await News.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getNewsByIdService = async (id: string): Promise<INews | null> => {
  const res = await News.findById(id);

  if (!res) {
    throw new ApiError("No News found with given ID", httpStatus.NOT_FOUND);
  }

  return res;
};

const updateNewsByIdService = async (
  id: string,
  payload: Partial<INews>,
): Promise<INews | null> => {
  const res = await News.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return res;
};

const deleteNewsByIdService = async (id: string): Promise<INews | null> => {
  const res = await News.findByIdAndDelete(id);

  if (!res) {
    throw new ApiError("Failed to delete News", httpStatus.BAD_REQUEST);
  }

  return res;
};

export const NewsService = {
  createNewsService,
  getNewsService,
  getNewsByIdService,
  updateNewsByIdService,
  deleteNewsByIdService,
};
