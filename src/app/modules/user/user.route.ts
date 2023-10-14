import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = Router();

router.post(
  "/create-passenger",
  requestValidator(UserValidation.createPassenger),
  UserController.createPassenger,
);

router.post(
  "/create-bus-owner",
  requestValidator(UserValidation.createBusOwner),
  UserController.createBusOwner,
);

router.post(
  "/create-admin",
  requestValidator(UserValidation.createAdmin),
  UserController.createAdmin,
);

export const UserRouter = router;
