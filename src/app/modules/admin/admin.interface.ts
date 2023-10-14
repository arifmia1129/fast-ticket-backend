import { HydratedDocument, Model, Types } from "mongoose";
import { IName } from "../../../interfaces/common.interface";
import { IPermission } from "../permission/permission.interface";

export type IAdmin = {
  id: string;
  permissions?: Types.ObjectId[] | IPermission[];
  name: IName;
  designation: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
};

export type IAdminMethods = {
  fullName(): string;
};

export type AdminModel = {
  createWithFullName(): Promise<HydratedDocument<IAdmin, IAdminMethods>>;
  // name: string,
} & Model<IAdmin, object, IAdminMethods>;
