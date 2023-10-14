/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";
import User from "../user/user.model";
import {
  ChangePassword,
  LoginCredential,
  LoginResponse,
  RefreshToken,
} from "./auth.interface";
import config from "../../../config";
import * as jwtHelper from "../../../helpers/jwtHelper";
import { JwtPayload, Secret } from "jsonwebtoken";

const loginAuthService = async (
  payload: LoginCredential,
): Promise<LoginResponse> => {
  const { id, password } = payload;

  const user = new User();

  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError("Failed to find user with ID", httpStatus.NOT_FOUND);
  }

  if (!isUserExist?.password) {
    throw new ApiError("Invalid user information.", httpStatus.BAD_REQUEST);
  }

  const isPasswordMatched = await user.isPasswordMatched(
    password,
    isUserExist.password,
  );

  if (!isPasswordMatched) {
    throw new ApiError("Invalid ID or Password", httpStatus.FORBIDDEN);
  }

  const { id: userId, role, needChangePassword } = isUserExist;

  const accessToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string,
  );

  const refreshToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needChangePassword,
  };
};

const refreshTokenAuthService = async (
  token: string,
): Promise<RefreshToken> => {
  const verifiedToken = jwtHelper.verifyAndDecodeToken(
    token,
    config.jwt.refresh_secret as Secret,
  );

  const { userId, role } = verifiedToken;

  const user = new User();

  const isUserExist = await user.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError("User does not exist", httpStatus.FORBIDDEN);
  }

  if (!isUserExist?.password) {
    throw new ApiError("Invalid user information.", httpStatus.BAD_REQUEST);
  }

  if (isUserExist.role !== role) {
    throw new ApiError("User role is mismatched", httpStatus.FORBIDDEN);
  }

  const accessToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string,
  );

  return {
    accessToken,
  };
};

const changePasswordAuthService = async (
  userInfo: JwtPayload,
  payload: ChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  const { userId } = userInfo;

  const user = new User();

  const isUserExist = await User.findOne({ id: userId }).select("+password");

  if (!isUserExist) {
    throw new ApiError("User not found", httpStatus.NOT_FOUND);
  }

  if (!isUserExist?.password) {
    throw new ApiError("Invalid user information.", httpStatus.BAD_REQUEST);
  }

  const isPasswordMatched = await user.isPasswordMatched(
    oldPassword,
    isUserExist.password,
  );

  if (!isPasswordMatched) {
    throw new ApiError("Invalid old Password", httpStatus.FORBIDDEN);
  }

  isUserExist.needChangePassword = false;
  isUserExist.password = newPassword;
  await isUserExist.save();
};

export const AuthService = {
  loginAuthService,
  refreshTokenAuthService,
  changePasswordAuthService,
};
