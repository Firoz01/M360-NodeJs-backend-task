import { Router } from "express";
import {
  createAttribute,
  getAllAttribute,
  getOneAttribute,
  updateAttribute,
  deleteAttribute,
} from "../controller/attributeController";
const router = Router();

router.route("/").post(createAttribute).get(getAllAttribute);
router
  .route("/:id")
  .get(getOneAttribute)
  .put(updateAttribute)
  .delete(deleteAttribute);

export default router;
