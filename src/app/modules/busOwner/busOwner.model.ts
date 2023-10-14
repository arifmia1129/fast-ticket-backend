import { Schema, model } from "mongoose";
import {
  IBusOwner,
  IBusOwnerMethods,
  BusOwnerModel,
} from "./busOwner.interface";
import { genderEnum } from "../../constant/common";

export const BusOwnerSchema = new Schema<
  IBusOwner,
  BusOwnerModel,
  IBusOwnerMethods
>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string): boolean {
          return value.length === 7;
        },
        message: "ID must be 7 character",
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
    companyName: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    tradeLicenseNo: {
      type: String,
      required: true,
      unique: true,
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
    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const BusOwner = model<IBusOwner, BusOwnerModel>("BusOwner", BusOwnerSchema);

export default BusOwner;
