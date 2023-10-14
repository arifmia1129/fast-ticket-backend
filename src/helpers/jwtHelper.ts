import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import httpStatus from "../shared/httpStatus";
import ApiError from "../errors/ApiError";

export const createToken = (
  payload: object,
  secret: Secret,
  expireTime: string,
): string => {
  const token = jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
  return token;
};

export const verifyAndDecodeToken = (
  token: string,
  secret: Secret,
): JwtPayload => {
  try {
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    return decodedToken;
  } catch (error) {
    throw new ApiError("Invalid token", httpStatus.FORBIDDEN);
  }
};
