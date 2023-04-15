import { Router } from "express";
import {
  createNewProduct,
  getAllProducts,
  getAProduct,
  searchProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController";

const router = Router();

router.route("/").post(createNewProduct).get(getAllProducts);
router.get("/search", searchProduct);
router.route("/:id").get(getAProduct).put(updateProduct).delete(deleteProduct);

export default router;
