import { Schema, model } from "mongoose";
import { INews, INewsMethods, NewsModel } from "./news.interface";

export const NewsSchema = new Schema<INews, NewsModel, INewsMethods>(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    newsBy: {
      type: String,
      required: true,
    },
    newsLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const News = model<INews, NewsModel>("News", NewsSchema);

export default News;
