import { Router } from "express";
import {
  createNewCategory,
  getAllCategories,
  getACategory,
  updateCategory,
  deleteCategory,
} from "../controller/categoryController";
const router = Router();

router.route("/").post(createNewCategory).get(getAllCategories);
router
  .route("/:id")
  .get(getACategory)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;
