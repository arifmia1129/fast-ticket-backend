import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { PassengerController } from "./passenger.controller";
import { PassengerValidation } from "./passenger.validation";

const router = Router();

router.get("/", PassengerController.getPassenger);
router
  .route("/:id")
  .get(PassengerController.getPassengerById)
  .patch(
    requestValidator(PassengerValidation.updateValidation),
    PassengerController.updatePassengerById,
  )
  .delete(PassengerController.deletePassengerById);

export const PassengerRouter = router;
