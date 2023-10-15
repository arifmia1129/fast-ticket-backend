import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { UserService } from "./user.service";
import httpStatus from "../../../shared/httpStatus";
import { JwtPayload } from "jsonwebtoken";
import { IAdmin } from "../admin/admin.interface";
import { IPassenger } from "../passenger/passenger.interface";
import { IBusOwner } from "../busOwner/busOwner.interface";

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

const userProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId, role } = req.user as JwtPayload;

  const result = await UserService.userProfileService({ userId, role });

  sendResponse<IAdmin | IPassenger | IBusOwner | null>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully retrived user profile information",
    data: result,
  });
});

export const UserController = {
  createPassenger,
  createBusOwner,
  createAdmin,
  userProfile,
};
