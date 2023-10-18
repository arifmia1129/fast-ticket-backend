import { Schema, model } from "mongoose";
import { IBlog, IBlogMethods, BlogModel } from "./blog.interface";

export const BlogSchema = new Schema<IBlog, BlogModel, IBlogMethods>(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Blog = model<IBlog, BlogModel>("Blog", BlogSchema);

export default Blog;
