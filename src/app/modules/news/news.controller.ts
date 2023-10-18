import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { INews } from "./news.interface";
import { newsFilterableField } from "./news.constant";
import { paginationField } from "../../constant/pagination";
import { NewsService } from "./news.service";
import httpStatus from "../../../shared/httpStatus";

const createNews = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsService.createNewsService(req.body);

  sendResponse<INews>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully created News",
    data: result,
  });
});

const getNews = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, newsFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await NewsService.getNewsService(
    filterData,
    paginationOptions,
  );

  sendResponse<INews[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived all Newss",
    meta: result.meta,
    data: result.data,
  });
});

const getNewsById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NewsService.getNewsByIdService(id);
  sendResponse<INews>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived News with id",
    data: result,
  });
});

const updateNewsById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NewsService.updateNewsByIdService(id, req.body);
  sendResponse<INews>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated News with id",
    data: result,
  });
});

const deleteNewsById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NewsService.deleteNewsByIdService(id);
  sendResponse<INews>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted News with id",
    data: result,
  });
});

export const NewsController = {
  createNews,
  getNews,
  getNewsById,
  updateNewsById,
  deleteNewsById,
};
