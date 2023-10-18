import { HydratedDocument, Model } from "mongoose";

export type INews = {
  title: string;
  imageUrl: string;
  newsBy: string;
  newsLink: string;
};

export type INewsMethods = {
  fullName(): string;
};

export type NewsModel = {
  createWithFullName(): Promise<HydratedDocument<INews, INewsMethods>>;
  // name: string,
} & Model<INews, object, INewsMethods>;
