"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getACategory = exports.getAllCategories = exports.createNewCategory = void 0;
const appError_1 = __importDefault(require("../util/appError"));
const asyncWrapper_1 = __importDefault(require("../util/asyncWrapper"));
const database_1 = __importDefault(require("../util/database"));
exports.createNewCategory = (0, asyncWrapper_1.default)(async (req, res) => {
    const { name, parent_id } = req.body;
    const category = await (0, database_1.default)("categories").insert({
        name,
        parent_id,
    });
    res.status(201).json({
        status: "success",
        message: "category created successfully",
        data: category,
    });
});
exports.getAllCategories = (0, asyncWrapper_1.default)(async (req, res) => {
    const categories = await (0, database_1.default)("categories");
    res.status(200).json({
        status: "success",
        message: `Successfully get all ${categories.length} category`,
        data: categories,
    });
});
exports.getACategory = (0, asyncWrapper_1.default)(async (req, res, next) => {
    const id = Number(req.params.id);
    const category = await (0, database_1.default)("categories").where({ id }).first();
    if (!category) {
        return next(new appError_1.default(`Can not find any category with that id: ${id} `, 404));
    }
    res.status(200).json({
        status: "success",
        message: `Successfully get category with that id ${id}`,
        data: category,
    });
});
exports.updateCategory = (0, asyncWrapper_1.default)(async (req, res, next) => {
    const id = Number(req.params.id);
    const { name, parent_id, is_active } = req.body;
    const category = await (0, database_1.default)("categories")
        .where({ id })
        .update({ name, parent_id, is_active });
    if (!category) {
        return next(new appError_1.default(`Can not find any category with that id: ${id} `, 404));
    }
    res.status(200).json({
        status: "success",
        message: `Successfully updated category with that id ${id}`,
        data: category,
    });
});
exports.deleteCategory = (0, asyncWrapper_1.default)(async (req, res, next) => {
    const id = Number(req.params.id);
    const numDeleted = await (0, database_1.default)("categories").where({ id }).del();
    if (!numDeleted) {
        return next(new appError_1.default(`Can not find any category with that id: ${id} `, 404));
    }
    res.status(200).send(`Deleted ${numDeleted} category.`);
});
//# sourceMappingURL=categoryController.js.map