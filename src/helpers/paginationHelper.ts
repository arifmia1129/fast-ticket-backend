import { SortOrder } from "mongoose";

type Option = {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type CalculatePagination = {
  page: number;
  limit: number;
  skip: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

const calculatePagination = (option: Option): CalculatePagination => {
  const page = Number(option.page || 1);
  const limit = Number(option.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = option.sortBy || "createdAt";
  const sortOrder = option.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = {
  calculatePagination,
};
