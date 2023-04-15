"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controller/productController");
const router = (0, express_1.Router)();
router.route("/").post(productController_1.createNewProduct).get(productController_1.getAllProducts);
router.get("/search", productController_1.searchProduct);
router.route("/:id").get(productController_1.getAProduct).put(productController_1.updateProduct).delete(productController_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=productRouter.js.map