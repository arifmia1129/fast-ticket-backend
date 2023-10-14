import { HydratedDocument, Model } from "mongoose";
import { IName } from "../../../interfaces/common.interface";

export type IBusOwner = {
  id: string;
  name: IName;
  companyName: string;
  designation: string;
  tradeLicenseNo: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
};

export type IBusOwnerMethods = {
  fullName(): string;
};

export type BusOwnerModel = {
  createWithFullName(): Promise<HydratedDocument<IBusOwner, IBusOwnerMethods>>;
  // name: string,
} & Model<IBusOwner, object, IBusOwnerMethods>;
