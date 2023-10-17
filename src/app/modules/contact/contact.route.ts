import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { ContactController } from "./contact.controller";
import { ContactValidation } from "./contact.validation";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.post(
  "/",
  requestValidator(ContactValidation.createValidation),
  ContactController.createContact,
);
router.get(
  "/",
  auth(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.SUPER_ADMIN),
  ContactController.getContact,
);

router
  .route("/:id")
  .all(auth(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.SUPER_ADMIN))
  .get(ContactController.getContactById)
  .patch(
    requestValidator(ContactValidation.updateValidation),
    ContactController.updateContactById,
  )
  .delete(ContactController.deleteContactById);

export const ContactRouter = router;
