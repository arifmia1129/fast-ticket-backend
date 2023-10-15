import { Schema, model } from "mongoose";
import { IAdmin, IAdminMethods, AdminModel } from "./admin.interface";
import { genderEnum } from "../../constant/common";

export const AdminSchema = new Schema<IAdmin, AdminModel, IAdminMethods>(
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
    designation: {
      type: String,
      required: true,
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
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
      default:
        "https://img.freepik.com/free-photo/purple-osteospermum-daisy-flower_1373-16.jpg",
    },
  },
  {
    timestamps: true,
  },
);

const Admin = model<IAdmin, AdminModel>("Admin", AdminSchema);

export default Admin;
