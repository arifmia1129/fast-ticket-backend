import { HydratedDocument, Model } from "mongoose";
import { IName } from "../../../interfaces/common.interface";

export type IAdmin = {
  id: string;
  name: IName;
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
