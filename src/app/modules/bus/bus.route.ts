import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { BusController } from "./bus.controller";
import { BusValidation } from "./bus.validation";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

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
router.get(
  "/",
  auth(
    USER_ROLE_ENUM.BUS_OWNER,
    USER_ROLE_ENUM.SUPER_ADMIN,
    USER_ROLE_ENUM.ADMIN,
  ),
  BusController.getBus,
);

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
