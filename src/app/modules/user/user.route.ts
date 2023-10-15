import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.get(
  "/profile",
  auth(
    USER_ROLE_ENUM.ADMIN,
    USER_ROLE_ENUM.BUS_OWNER,
    USER_ROLE_ENUM.PASSENGER,
  ),
  UserController.userProfile,
);

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
