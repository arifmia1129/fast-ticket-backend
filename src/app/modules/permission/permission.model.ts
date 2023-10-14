import { Schema, model } from "mongoose";
import {
  IPermission,
  IPermissionMethods,
  PermissionModel,
} from "./permission.interface";

export const PermissionSchema = new Schema<
  IPermission,
  PermissionModel,
  IPermissionMethods
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const Permission = model<IPermission, PermissionModel>(
  "Permission",
  PermissionSchema,
);

export default Permission;
