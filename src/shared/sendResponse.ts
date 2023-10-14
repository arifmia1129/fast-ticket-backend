import { Response } from "express";

type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | number | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: ApiResponse<T>) => {
  const responseMsg: ApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseMsg);
};

export default sendResponse;
