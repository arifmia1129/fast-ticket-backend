import { z } from "zod";

const createValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    city: z.string({
      required_error: "City is required",
    }),
    contactNo: z.string({
      required_error: "Contact number is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    message: z.string({
      required_error: "Message is required",
    }),
  }),
});
const updateValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    city: z.string().optional(),
    contactNo: z.string().optional(),
    email: z.string().optional(),
    message: z.string().optional(),
  }),
});

export const ContactValidation = {
  createValidation,
  updateValidation,
};
