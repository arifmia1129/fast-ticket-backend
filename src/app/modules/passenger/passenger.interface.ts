import { HydratedDocument, Model } from "mongoose";
import { IName } from "../../../interfaces/common.interface";

export type IPassenger = {
  id: string;
  name: IName;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: "a+" | "a-" | "b+" | "b-" | "ab+" | "ab-" | "o+" | "o-";
  profileImage?: string;
};

export type IPassengerMethods = {
  fullName(): string;
};

export type PassengerModel = {
  createWithFullName(): Promise<
    HydratedDocument<IPassenger, IPassengerMethods>
  >;
  // name: string,
} & Model<IPassenger, object, IPassengerMethods>;
