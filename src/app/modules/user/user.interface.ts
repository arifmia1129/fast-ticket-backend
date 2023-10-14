/* eslint-disable no-unused-vars */
import { HydratedDocument, Model, Types } from "mongoose";
import { IPassenger } from "../passenger/passenger.interface";
import { IBusOwner } from "../busOwner/busOwner.interface";
import { IAdmin } from "../admin/admin.interface";

export type IUser = {
  id: string;
  role: "passenger" | "bus_owner" | "admin";
  password: string;
  changePasswordAt: Date;
  needChangePassword: boolean;
  passenger: Types.ObjectId | IPassenger;
  busOwner: Types.ObjectId | IBusOwner;
  admin: Types.ObjectId | IAdmin;
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
