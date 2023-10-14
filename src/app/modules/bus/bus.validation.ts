import { z } from "zod";

const createValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Bus name is required",
    }),
    owner: z.string({
      required_error: "Owner is required",
    }),
  }),
});
const updateValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    owner: z.string().optional(),
  }),
});

export const BusValidation = {
  createValidation,
  updateValidation,
};
