import { z } from "zod";

const createValidation = z.object({
  body: z.object({
    bus: z.string({
      required_error: "Bus ID is required",
    }),
    busNo: z.string({
      required_error: "Bus number is required",
    }),
    source: z.string({
      required_error: "Source is required",
    }),
    destination: z.string({
      required_error: "Destination is required",
    }),
    date: z.string({
      required_error: "Date is required",
    }),
    totalSeat: z.number({
      required_error: "Total seat is required",
    }),
  }),
});
const updateValidation = z.object({
  body: z.object({
    bus: z.string().optional(),
    busNo: z.string().optional(),
    source: z.string().optional(),
    destination: z.string().optional(),
    date: z.string().optional(),
  }),
});

export const TripValidation = {
  createValidation,
  updateValidation,
};
