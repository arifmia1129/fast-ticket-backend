import { Router } from "express";
import { BlogController } from "./blog.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.SUPER_ADMIN),
  BlogController.createBlog,
);
router.get("/", BlogController.getBlog);

router
  .route("/:id")
  .all(auth(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.SUPER_ADMIN))
  .get(BlogController.getBlogById)
  .patch(BlogController.updateBlogById)
  .delete(BlogController.deleteBlogById);

export const BlogRouter = router;
