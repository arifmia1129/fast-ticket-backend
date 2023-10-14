import { Schema, model } from "mongoose";
import {
  IPassenger,
  IPassengerMethods,
  PassengerModel,
} from "./passenger.interface";
import { bloodGroupEnum, genderEnum } from "./passenger.constant";

export const PassengerSchema = new Schema<
  IPassenger,
  PassengerModel,
  IPassengerMethods
>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string): boolean {
          return value.length === 9;
        },
        message: "ID must be 9 character",
      },
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: { type: String },
      lastName: {
        type: String,
      },
    },
    gender: {
      type: String,
      required: true,
      enum: genderEnum,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string): boolean {
          return value.length === 11;
        },
        message: "Contact Number must be 11 character",
      },
    },
    emergencyContactNo: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string): boolean {
          return value.length === 11;
        },
        message: "Emergency Contact Number must be 11 character",
      },
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      lowercase: true,
      enum: bloodGroupEnum,
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Passenger = model<IPassenger, PassengerModel>(
  "Passenger",
  PassengerSchema,
);

export default Passenger;
