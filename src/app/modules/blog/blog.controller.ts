import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { IBlog } from "./blog.interface";
import { blogFilterableField } from "./blog.constant";
import { paginationField } from "../../constant/pagination";
import { BlogService } from "./blog.service";
import httpStatus from "../../../shared/httpStatus";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.createBlogService(req.body);

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully created Blog",
    data: result,
  });
});

const getBlog = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, blogFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await BlogService.getBlogService(
    filterData,
    paginationOptions,
  );

  sendResponse<IBlog[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived all Blogs",
    meta: result.meta,
    data: result.data,
  });
});

const getBlogById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.getBlogByIdService(id);
  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived Blog with id",
    data: result,
  });
});

const updateBlogById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.updateBlogByIdService(id, req.body);
  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated Blog with id",
    data: result,
  });
});

const deleteBlogById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlogByIdService(id);
  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted Blog with id",
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getBlog,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};
