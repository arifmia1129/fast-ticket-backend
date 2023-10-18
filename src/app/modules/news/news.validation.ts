import { z } from "zod";

const createValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: "News title is required",
    }),
    imageUrl: z.string({
      required_error: "Image URL is required",
    }),
    newsBy: z.string({
      required_error: "News source is required",
    }),
    newsLink: z.string({
      required_error: "News link is required",
    }),
  }),
});
const updateValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    imageUrl: z.string().optional(),
    newsBy: z.string().optional(),
    newsLink: z.string().optional(),
  }),
});

export const NewsValidation = {
  createValidation,
  updateValidation,
};
