import { z } from "zod";

const loginAuthValidation = z.object({
  body: z.object({
    id: z.string({
      required_error: "ID is required for login",
    }),
    password: z.string({
      required_error: "Password is required for login",
    }),
  }),
});

const refreshTokenAuthValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required",
    }),
  }),
});

const changePasswordAuthValidation = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "Old password is required",
    }),
    newPassword: z.string({
      required_error: "New password is required",
    }),
  }),
});

export const AuthValidation = {
  loginAuthValidation,
  refreshTokenAuthValidation,
  changePasswordAuthValidation,
};
