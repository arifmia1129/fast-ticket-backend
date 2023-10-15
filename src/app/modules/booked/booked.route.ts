import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { BookedController } from "./booked.controller";
import { BookedValidation } from "./booked.validation";

const router = Router();

router.post(
  "/",
  requestValidator(BookedValidation.createValidation),
  BookedController.createBooked,
);
router.get("/", BookedController.getBooked);

router
  .route("/:id")
  .get(BookedController.getBookedById)
  .patch(
    requestValidator(BookedValidation.updateValidation),
    BookedController.updateBookedById,
  )
  .delete(BookedController.deleteBookedById);

export const BookedRouter = router;
