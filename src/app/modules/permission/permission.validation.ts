import { z } from "zod";

const createUpdateValidation = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
});

export const PermissionValidation = {
  createUpdateValidation,
};
