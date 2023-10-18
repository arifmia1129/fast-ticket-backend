import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { NewsController } from "./news.controller";
import { NewsValidation } from "./news.validation";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.SUPER_ADMIN),
  requestValidator(NewsValidation.createValidation),
  NewsController.createNews,
);
router.get("/", NewsController.getNews);

router
  .route("/:id")
  .all(auth(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.SUPER_ADMIN))
  .get(NewsController.getNewsById)
  .patch(
    requestValidator(NewsValidation.updateValidation),
    NewsController.updateNewsById,
  )
  .delete(NewsController.deleteNewsById);

export const NewsRouter = router;
