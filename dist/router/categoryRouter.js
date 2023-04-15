"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controller/categoryController");
const router = (0, express_1.Router)();
router.route("/").post(categoryController_1.createNewCategory).get(categoryController_1.getAllCategories);
router
    .route("/:id")
    .get(categoryController_1.getACategory)
    .put(categoryController_1.updateCategory)
    .delete(categoryController_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=categoryRouter.js.map