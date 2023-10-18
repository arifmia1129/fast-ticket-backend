import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { PassengerController } from "./passenger.controller";
import { PassengerValidation } from "./passenger.validation";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.get(
  "/",
  auth(USER_ROLE_ENUM.SUPER_ADMIN, USER_ROLE_ENUM.ADMIN),
  PassengerController.getPassenger,
);
router
  .route("/:id")
  .all(
    auth(
      USER_ROLE_ENUM.SUPER_ADMIN,
      USER_ROLE_ENUM.ADMIN,
      USER_ROLE_ENUM.PASSENGER,
    ),
  )
  .get(PassengerController.getPassengerById)
  .patch(
    requestValidator(PassengerValidation.updateValidation),
    PassengerController.updatePassengerById,
  )
  .delete(PassengerController.deletePassengerById);

export const PassengerRouter = router;
