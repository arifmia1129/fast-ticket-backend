import { z } from "zod";
import { bloodGroupEnum } from "./passenger.constant";
import { genderEnum } from "../../constant/common";

const updateValidation = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    gender: z.enum([...genderEnum] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    bloodGroup: z.enum([...bloodGroupEnum] as [string, ...string[]]).optional(),
  }),
});

export const PassengerValidation = {
  updateValidation,
};
