import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { UserService } from "./user.service";
import httpStatus from "../../../shared/httpStatus";

const createPassenger = catchAsync(async (req: Request, res: Response) => {
  const { passenger, ...userInfo } = req.body;

  const result = await UserService.createPassengerService(passenger, userInfo);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully created passenger",
    data: result,
  });
});

const createBusOwner = catchAsync(async (req: Request, res: Response) => {
  const { busOwner, ...userInfo } = req.body;

  const result = await UserService.createBusOwnerService(busOwner, userInfo);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully created bus owner",
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userInfo } = req.body;

  const result = await UserService.createAdminService(admin, userInfo);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully created admin",
    data: result,
  });
});

export const UserController = {
  createPassenger,
  createBusOwner,
  createAdmin,
};
