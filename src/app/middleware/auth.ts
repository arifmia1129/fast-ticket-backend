import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import httpStatus from "../../shared/httpStatus";
import { verifyAndDecodeToken } from "../../helpers/jwtHelper";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const auth = (...authorizedRole: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      // check token given or not
      if (!token) {
        throw new ApiError("You are unauthorized", httpStatus.UNAUTHORIZED);
      }

      const verifiedUser = verifyAndDecodeToken(
        token,
        config.jwt.secret as Secret,
      );

      if (!authorizedRole.includes(verifiedUser.role)) {
        throw new ApiError(
          "You are not authorized to access this future",
          httpStatus.FORBIDDEN,
        );
      }

      req.user = verifiedUser;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
