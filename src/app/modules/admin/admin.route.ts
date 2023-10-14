import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";
import { AdminController } from "./admin.controller";
import { AdminValidation } from "./admin.validation";

const router = Router();

router.get(
  "/",
  auth(USER_ROLE_ENUM.SUPER_ADMIN, USER_ROLE_ENUM.ADMIN),
  AdminController.getAdmin,
);
router
  .route("/:id")
  .all(auth(USER_ROLE_ENUM.SUPER_ADMIN, USER_ROLE_ENUM.ADMIN))
  .get(AdminController.getAdminById)
  .patch(
    requestValidator(AdminValidation.updateValidation),
    AdminController.updateAdminById,
  )
  .delete(AdminController.deleteAdminById);

export const AdminRouter = router;
