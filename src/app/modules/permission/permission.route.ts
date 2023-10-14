import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { PermissionController } from "./permission.controller";
import { PermissionValidation } from "./permission.validation";

const router = Router();

router.post(
  "/",
  requestValidator(PermissionValidation.createUpdateValidation),
  PermissionController.createPermission,
);
router.get("/", PermissionController.getPermission);

router
  .route("/:id")
  .get(PermissionController.getPermissionById)
  .patch(
    requestValidator(PermissionValidation.createUpdateValidation),
    PermissionController.updatePermissionById,
  )
  .delete(PermissionController.deletePermissionById);

export const PermissionRouter = router;
