import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { BusOwnerController } from "./busOwner.controller";
import { BusOwnerValidation } from "./busOwner.validation";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.get(
  "/",
  auth(USER_ROLE_ENUM.SUPER_ADMIN, USER_ROLE_ENUM.ADMIN),
  BusOwnerController.getBusOwner,
);
router
  .route("/:id")
  .all(auth(USER_ROLE_ENUM.SUPER_ADMIN, USER_ROLE_ENUM.ADMIN))
  .get(BusOwnerController.getBusOwnerById)
  .patch(
    requestValidator(BusOwnerValidation.updateValidation),
    BusOwnerController.updateBusOwnerById,
  )
  .delete(BusOwnerController.deleteBusOwnerById);

export const BusOwnerRouter = router;
