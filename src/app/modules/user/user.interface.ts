/* eslint-disable no-unused-vars */
import { HydratedDocument, Model, Types } from "mongoose";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

export type IUser = {
  id: string;
  role: USER_ROLE_ENUM;
  password: string;
  changePasswordAt: Date;
  needChangePassword: boolean;
  passenger: Types.ObjectId;
  busOwner: Types.ObjectId;
  admin: Types.ObjectId;
};

export type IUserMethods = {
  isUserExist(
    id: string,
  ): Promise<Pick<
    IUser,
    "id" | "password" | "role" | "needChangePassword"
  > | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
};

export type UserModel = {
  createWithFullName(): Promise<HydratedDocument<IUser, IUserMethods>>;
  // name: string,
} & Model<IUser, object, IUserMethods>;
