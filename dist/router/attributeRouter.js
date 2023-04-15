"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attributeController_1 = require("../controller/attributeController");
const router = (0, express_1.Router)();
router.route("/").post(attributeController_1.createAttribute).get(attributeController_1.getAllAttribute);
router
    .route("/:id")
    .get(attributeController_1.getOneAttribute)
    .put(attributeController_1.updateAttribute)
    .delete(attributeController_1.deleteAttribute);
exports.default = router;
//# sourceMappingURL=attributeRouter.js.map