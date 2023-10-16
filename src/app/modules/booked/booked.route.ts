import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { BookedController } from "./booked.controller";
import { BookedValidation } from "./booked.validation";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.post(
  "/",
  requestValidator(BookedValidation.createValidation),
  BookedController.createBooked,
);
router.get("/", BookedController.getBooked);
router.get(
  "/my-booked",
  auth(USER_ROLE_ENUM.PASSENGER),
  BookedController.getMyBooked,
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
  .get(BookedController.getBookedById)
  .patch(
    requestValidator(BookedValidation.updateValidation),
    BookedController.updateBookedById,
  )
  .delete(BookedController.deleteBookedById);

export const BookedRouter = router;
