import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { TripController } from "./trip.controller";
import { TripValidation } from "./trip.validation";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.post(
  "/",
  requestValidator(TripValidation.createValidation),
  auth(
    USER_ROLE_ENUM.BUS_OWNER,
    USER_ROLE_ENUM.SUPER_ADMIN,
    USER_ROLE_ENUM.ADMIN,
  ),
  TripController.createTrip,
);
router.get(
  "/",
  auth(
    USER_ROLE_ENUM.BUS_OWNER,
    USER_ROLE_ENUM.SUPER_ADMIN,
    USER_ROLE_ENUM.ADMIN,
    USER_ROLE_ENUM.PASSENGER,
  ),
  TripController.getTrip,
);
router.get("/source", TripController.getTripSource);
router.get("/destination", TripController.getTripDestination);

router
  .route("/:id")
  .get(TripController.getTripById)
  .all(
    auth(
      USER_ROLE_ENUM.BUS_OWNER,
      USER_ROLE_ENUM.SUPER_ADMIN,
      USER_ROLE_ENUM.ADMIN,
    ),
  )
  .patch(
    requestValidator(TripValidation.updateValidation),
    TripController.updateTripById,
  )
  .delete(TripController.deleteTripById);

export const TripRouter = router;
