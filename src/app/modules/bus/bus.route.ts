import { NextFunction, Request, Response, Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { BusController } from "./bus.controller";
import { BusValidation } from "./bus.validation";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

// Middleware to add authentication data
function addAuthData(req: Request, res: Response, next: NextFunction) {
  // Check if there is an authorization header
  if (req.headers.authorization) {
    // If there's an authorization header, apply the auth middleware
    auth(
      USER_ROLE_ENUM.BUS_OWNER,
      USER_ROLE_ENUM.SUPER_ADMIN,
      USER_ROLE_ENUM.ADMIN,
    )(req, res, next);
  } else {
    // If there's no authorization header, continue to the next middleware
    next();
  }
}

router.post(
  "/",
  requestValidator(BusValidation.createValidation),
  auth(
    USER_ROLE_ENUM.BUS_OWNER,
    USER_ROLE_ENUM.SUPER_ADMIN,
    USER_ROLE_ENUM.ADMIN,
  ),
  BusController.createBus,
);

router.post(
  "/review/:id",
  auth(USER_ROLE_ENUM.PASSENGER),
  BusController.addBusReviewById,
);
router.get("/", addAuthData, BusController.getBus);

router
  .route("/:id")
  .get(BusController.getBusById)
  .all(
    auth(
      USER_ROLE_ENUM.BUS_OWNER,
      USER_ROLE_ENUM.SUPER_ADMIN,
      USER_ROLE_ENUM.ADMIN,
    ),
  )
  .patch(
    requestValidator(BusValidation.updateValidation),
    BusController.updateBusById,
  )
  .delete(BusController.deleteBusById);

export const BusRouter = router;
