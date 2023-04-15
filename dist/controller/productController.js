"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getAProduct = exports.searchProduct = exports.getAllProducts = exports.createNewProduct = void 0;
const asyncWrapper_1 = __importDefault(require("../util/asyncWrapper"));
const database_1 = __importDefault(require("../util/database"));
exports.createNewProduct = (0, asyncWrapper_1.default)(async (req, res, next) => {
    const { name, description, price, quantity, category_id, attribute_id, attribute_value, } = req.body;
    const product = await (0, database_1.default)("products").insert({
        name,
        description,
        price,
        quantity,
        category_id,
    });
    console.log(product[0]);
    const product_id = product[0];
    if (product) {
        const value = attribute_value;
        await (0, database_1.default)("product_categories").insert({
            product_id,
            category_id,
        });
        await (0, database_1.default)("product_attributes").insert({
            product_id,
            attribute_id,
            value,
        });
    }
    res.status(201).json({
        status: "success",
        message: "New product created successfully",
    });
});
exports.getAllProducts = (0, asyncWrapper_1.default)(async (req, res) => {
    const categoryId = req.query.categoryId;
    const status = req.query.status;
    let productsQuery = (0, database_1.default)("products");
    if (categoryId) {
        // Get all products under the given category and its children
        const subcategoriesQuery = (0, database_1.default)("categories")
            .select("id")
            .where("id", "=", categoryId)
            .orWhere("parent_id", "=", categoryId)
            .orWhereIn("parent_id", function () {
            this.select("id")
                .from("categories")
                .where("parent_id", "=", categoryId);
        });
        const productIdsQuery = (0, database_1.default)("product_categories")
            .select("product_id")
            .whereIn("category_id", subcategoriesQuery);
        productsQuery = productsQuery.whereIn("id", productIdsQuery);
    }
    if (status) {
        productsQuery = productsQuery.where("status", "=", status);
    }
    const products = await productsQuery;
    res.json({
        status: "success",
        message: `Successfully found`,
        data: products,
    });
});
exports.searchProduct = (0, asyncWrapper_1.default)(async (req, res) => {
    const keyword = req.query.keyword;
    console.log(keyword);
    const products = await (0, database_1.default)("products")
        .whereRaw("LOWER(name) LIKE ?", [`%${keyword.toLowerCase()}%`])
        .orWhereRaw("LOWER(description) LIKE ?", [`%${keyword.toLowerCase()}%`]);
    res.json(products);
});
exports.getAProduct = (0, asyncWrapper_1.default)(async (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = await (0, database_1.default)("products").where("id", "=", productId).first();
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    const categories = await (0, database_1.default)("categories")
        .join("product_categories", "categories.id", "=", "product_categories.category_id")
        .where("product_categories.product_id", "=", productId);
    const attributes = await (0, database_1.default)("attributes")
        .join("product_attributes", "attributes.id", "=", "product_attributes.attribute_id")
        .where("product_attributes.product_id", "=", productId);
    const productWithDetails = {
        ...product,
        categories,
        attributes,
    };
    res.json(productWithDetails);
});
exports.updateProduct = (0, asyncWrapper_1.default)(async (req, res) => {
    const productId = Number(req.params.id);
    const updates = req.body;
    await database_1.default.transaction(async (trx) => {
        // Update the product
        const productUpdateQuery = trx("products")
            .where("id", "=", productId)
            .update({
            name: updates.name,
            description: updates.description,
            price: updates.price,
            quantity: updates.quantity,
            updated_at: database_1.default.fn.now(),
        });
        // Update the product categories
        if (updates.categoryIds) {
            const productCategoryDeleteQuery = trx("product_categories")
                .where("product_id", "=", productId)
                .delete();
            const productCategoryInsertQuery = trx("product_categories").insert(updates.categoryIds.map((categoryId) => ({
                product_id: productId,
                category_id: categoryId,
            })));
            await Promise.all([
                productCategoryDeleteQuery,
                productCategoryInsertQuery,
            ]);
        }
        // Update the product attributes
        if (updates.attributes) {
            const productAttributeDeleteQuery = trx("product_attributes")
                .where("product_id", "=", productId)
                .delete();
            const attributeIds = await Promise.all(Object.keys(updates.attributes).map((attributeName) => trx("attributes")
                .select("id")
                .where("name", "=", attributeName)
                .first()));
            const productAttributeInsertQuery = trx("product_attributes").insert(attributeIds.map((attributeId, index) => ({
                product_id: productId,
                attribute_id: attributeId.id,
                value: updates.attributes[Object.keys(updates.attributes)[index]],
            })));
            await Promise.all([
                productAttributeDeleteQuery,
                productAttributeInsertQuery,
            ]);
        }
        // Execute all queries in the transaction
        await Promise.all([productUpdateQuery]);
        // Commit the transaction
        await trx.commit();
    });
    res
        .status(200)
        .json({ status: "success", message: "Product updated successfully" });
});
exports.deleteProduct = (0, asyncWrapper_1.default)(async (req, res) => {
    const id = Number(req.params.id);
    const numDeleted = await (0, database_1.default)("products").where({ id }).del();
    res.status(200).send(`Deleted ${numDeleted} product.`);
});
//# sourceMappingURL=productController.js.map