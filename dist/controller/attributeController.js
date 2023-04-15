"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAttribute = exports.updateAttribute = exports.getOneAttribute = exports.getAllAttribute = exports.createAttribute = void 0;
const appError_1 = __importDefault(require("../util/appError"));
const asyncWrapper_1 = __importDefault(require("../util/asyncWrapper"));
const database_1 = __importDefault(require("../util/database"));
exports.createAttribute = (0, asyncWrapper_1.default)(async (req, res) => {
    const { name } = req.body;
    const attribute = await (0, database_1.default)("attributes").insert({ name });
    res.status(201).json({
        status: "success",
        message: `Successfully created attribute`,
        data: attribute,
    });
});
exports.getAllAttribute = (0, asyncWrapper_1.default)(async (req, res) => {
    const attributes = await (0, database_1.default)("attributes");
    res.status(200).json({
        status: "success",
        message: `Successfully get all ${attributes.length} attributes`,
        data: attributes,
    });
});
exports.getOneAttribute = (0, asyncWrapper_1.default)(async (req, res, next) => {
    const id = Number(req.params.id);
    const attribute = await (0, database_1.default)("attributes").where({ id }).first();
    if (!attribute) {
        return next(new appError_1.default(`Attribute not found with that id :${id}`, 404));
    }
    res.status(200).json({
        status: "success",
        message: `Successfully find attribute with that id:${id}`,
        data: attribute,
    });
});
exports.updateAttribute = (0, asyncWrapper_1.default)(async (req, res, next) => {
    const id = Number(req.params.id);
    const { name } = req.body;
    const attribute = await (0, database_1.default)("attributes")
        .where({ id })
        .update({ name });
    if (!attribute) {
        return next(new appError_1.default(`Attribute not found with that id :${id}`, 404));
    }
    res.status(200).json({
        status: "success",
        message: `Successfully update attribute with that id :${id}`,
        data: attribute,
    });
});
exports.deleteAttribute = (0, asyncWrapper_1.default)(async (req, res, next) => {
    const id = Number(req.params.id);
    const numDeleted = await (0, database_1.default)("attributes").where({ id }).del();
    if (!numDeleted) {
        return next(new appError_1.default(`Attribute not found with that id :${id}`, 404));
    }
    res.status(200).send(`Deleted ${numDeleted} attribute.`);
});
//# sourceMappingURL=attributeController.js.map