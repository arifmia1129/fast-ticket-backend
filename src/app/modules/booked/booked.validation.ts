import { z } from "zod";

const createValidation = z.object({
  body: z.object({
    seat: z.string({
      required_error: "Seat is required",
    }),
    passenger: z.string({
      required_error: "Passenger is required",
    }),
    trip: z.string({
      required_error: "Trip is required",
    }),
  }),
});

const updateValidation = z.object({
  body: z
    .object({
      status: z.enum(["pending", "accepted", "cancelled"]),
    })
    .optional(),
});

export const BookedValidation = {
  createValidation,
  updateValidation,
};
