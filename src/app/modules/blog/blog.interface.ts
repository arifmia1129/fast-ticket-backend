import { HydratedDocument, Model } from "mongoose";

export type IBlog = {
  title: string;
  imageUrl: string;
  description: string;
};

export type IBlogMethods = {
  fullName(): string;
};

export type BlogModel = {
  createWithFullName(): Promise<HydratedDocument<IBlog, IBlogMethods>>;
  // name: string,
} & Model<IBlog, object, IBlogMethods>;
