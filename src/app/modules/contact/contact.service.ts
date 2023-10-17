/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import { IContact } from "./contact.interface";
import httpStatus from "../../../shared/httpStatus";
import ApiError from "../../../errors/ApiError";
import Contact from "./contact.model";
import { contactSearchableField } from "./contact.constant";

const createContactService = async (payload: any): Promise<IContact | null> => {
  return await Contact.create(payload);
};

const getContactService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IContact[]>> => {
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
      $or: contactSearchableField.map(field => ({
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

  const res = await Contact.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  if (!res.length) {
    throw new ApiError("No contact found", httpStatus.NOT_FOUND);
  }

  const total = await Contact.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

const getContactByIdService = async (id: string): Promise<IContact | null> => {
  const res = await Contact.findById(id);

  if (!res) {
    throw new ApiError("No contact found with given ID", httpStatus.NOT_FOUND);
  }

  return res;
};

const updateContactByIdService = async (
  id: string,
  payload: Partial<IContact>,
): Promise<IContact | null> => {
  const res = await Contact.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return res;
};

const deleteContactByIdService = async (
  id: string,
): Promise<IContact | null> => {
  const res = await Contact.findByIdAndDelete(id);

  if (!res) {
    throw new ApiError("Failed to delete contact", httpStatus.BAD_REQUEST);
  }

  return res;
};

export const ContactService = {
  createContactService,
  getContactService,
  getContactByIdService,
  updateContactByIdService,
  deleteContactByIdService,
};
