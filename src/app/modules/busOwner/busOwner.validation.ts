import { z } from "zod";

const updateValidation = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    companyName: z.string(),
    designation: z.string(),
    tradeLicenseNo: z.string(),
    gender: z.enum(["male", "female", "other"]),
    dateOfBirth: z.string(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    profileImage: z.string().optional(),
  }),
});

export const BusOwnerValidation = {
  updateValidation,
};
