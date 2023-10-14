import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "../../../shared/httpStatus";
import sendResponse from "../../../shared/sendResponse";
import config from "../../../config";
import { LoginResponse, RefreshToken } from "./auth.interface";
import { JwtPayload } from "jsonwebtoken";
import { AuthService } from "./auth.service";

const loginAuth = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginAuthService(req.body);

  const { refreshToken, ...other } = result;

  // set refresh token to cookie
  const cookieOption = {
    secret: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOption);

  sendResponse<LoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully logged in with your credentials",
    data: other,
  });
});

const refreshTokenAuth = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshTokenAuthService(refreshToken);

  sendResponse<RefreshToken>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully generated refresh token",
    data: result,
  });
});

const changePasswordAuth = catchAsync(async (req: Request, res: Response) => {
  await AuthService.changePasswordAuthService(req.user as JwtPayload, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully changed your password",
  });
});

export const AuthController = {
  loginAuth,
  refreshTokenAuth,
  changePasswordAuth,
};
