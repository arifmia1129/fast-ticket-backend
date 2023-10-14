import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { BusOwnerController } from "./busOwner.controller";
import { BusOwnerValidation } from "./busOwner.validation";

const router = Router();

router.get("/", BusOwnerController.getBusOwner);
router
  .route("/:id")
  .get(BusOwnerController.getBusOwnerById)
  .patch(
    requestValidator(BusOwnerValidation.updateValidation),
    BusOwnerController.updateBusOwnerById,
  )
  .delete(BusOwnerController.deleteBusOwnerById);

export const BusOwnerRouter = router;
