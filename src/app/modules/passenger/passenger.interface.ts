import { HydratedDocument, Model } from "mongoose";

export type Name = {
  firstName: string;
  middleName?: string;
  lastName?: string;
};

export type IPassenger = {
  id: string;
  name: Name;
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
