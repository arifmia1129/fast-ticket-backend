export type LoginCredential = {
  id: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  needChangePassword: boolean;
};

export type RefreshToken = {
  accessToken: string;
};

export type ChangePassword = {
  oldPassword: string;
  newPassword: string;
};
