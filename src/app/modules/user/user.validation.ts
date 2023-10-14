import { z } from "zod";
import { genderEnum } from "../../constant/common";
import { bloodGroupEnum } from "../passenger/passenger.constant";

const createPassenger = z.object({
  body: z.object({
    password: z.string().optional(),
    passenger: z.object({
      name: z.object({
        firstName: z.string(),
        middleName: z.string().optional(),
        lastName: z.string(),
      }),
      gender: z.enum([...genderEnum] as [string, ...string[]]),
      dateOfBirth: z.string(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      bloodGroup: z.enum([...bloodGroupEnum] as [string, ...string[]]),
      profileImage: z.string().optional(),
    }),
  }),
});

const createBusOwner = z.object({
  body: z.object({
    password: z.string().optional(),
    busOwner: z.object({
      name: z.object({
        firstName: z.string(),
        middleName: z.string().optional(),
        lastName: z.string(),
      }),
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
      profileImage: z.string().optional().optional(),
    }),
  }),
});

const createAdmin = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string(),
        middleName: z.string().optional(),
        lastName: z.string(),
      }),
      designation: z.string(),
      permissions: z.array(z.string()),
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImage: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createPassenger,
  createBusOwner,
  createAdmin,
};
