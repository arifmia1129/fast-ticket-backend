import { HydratedDocument, Model } from "mongoose";

export type IPermission = {
  title: string;
};

export type IPermissionMethods = {
  fullName(): string;
};

export type PermissionModel = {
  createWithFullName(): Promise<
    HydratedDocument<IPermission, IPermissionMethods>
  >;
  // name: string,
} & Model<IPermission, object, IPermissionMethods>;
