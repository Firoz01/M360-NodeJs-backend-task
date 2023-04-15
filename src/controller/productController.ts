import asyncWrapper from "../util/asyncWrapper";
import db from "../util/database";
import { Request, Response, NextFunction } from "express";


interface Product {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  categoryIds?: number[];
  attributes?: {
    [key: string]: string;
  };
}

export const createNewProduct = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      description,
      price,
      quantity,
      category_id,
      attribute_id,
      attribute_value,
    } = req.body;

    const product: Product = await db("products").insert({
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
      await db("product_categories").insert({
        product_id,
        category_id,
      });

      await db("product_attributes").insert({
        product_id,
        attribute_id,
        value,
      });
    }
    res.status(201).json({
      status: "success",
      message: "New product created successfully",
    });
  }
);

export const getAllProducts = asyncWrapper(
  async (req: Request, res: Response) => {
    const categoryId = req.query.categoryId as string;
    const status = req.query.status as string;

    let productsQuery = db("products");

    if (categoryId) {
      // Get all products under the given category and its children
      const subcategoriesQuery = db("categories")
        .select("id")
        .where("id", "=", categoryId)
        .orWhere("parent_id", "=", categoryId)
        .orWhereIn("parent_id", function () {
          this.select("id")
            .from("categories")
            .where("parent_id", "=", categoryId);
        });

      const productIdsQuery = db("product_categories")
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
  }
);

export const searchProduct = asyncWrapper(
  async (req: Request, res: Response) => {
    const keyword = req.query.keyword as string;

    console.log(keyword);

    const products = await db("products")
      .whereRaw("LOWER(name) LIKE ?", [`%${keyword.toLowerCase()}%`])
      .orWhereRaw("LOWER(description) LIKE ?", [`%${keyword.toLowerCase()}%`]);

    res.json(products);
  }
);

export const getAProduct = asyncWrapper(async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id, 10);

  const product = await db("products").where("id", "=", productId).first();

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const categories = await db("categories")
    .join(
      "product_categories",
      "categories.id",
      "=",
      "product_categories.category_id"
    )
    .where("product_categories.product_id", "=", productId);

  const attributes = await db("attributes")
    .join(
      "product_attributes",
      "attributes.id",
      "=",
      "product_attributes.attribute_id"
    )
    .where("product_attributes.product_id", "=", productId);

  const productWithDetails = {
    ...product,
    categories,
    attributes,
  };

  res.json(productWithDetails);
});

export const updateProduct = asyncWrapper(
  async (req: Request, res: Response) => {
    const productId = Number(req.params.id);
    const updates = req.body as Product;

    await db.transaction(async (trx) => {
      // Update the product
      const productUpdateQuery = trx("products")
        .where("id", "=", productId)
        .update({
          name: updates.name,
          description: updates.description,
          price: updates.price,
          quantity: updates.quantity,
          updated_at: db.fn.now(),
        });

      // Update the product categories
      if (updates.categoryIds) {
        const productCategoryDeleteQuery = trx("product_categories")
          .where("product_id", "=", productId)
          .delete();

        const productCategoryInsertQuery = trx("product_categories").insert(
          updates.categoryIds.map((categoryId) => ({
            product_id: productId,
            category_id: categoryId,
          }))
        );

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

        const attributeIds = await Promise.all(
          Object.keys(updates.attributes).map((attributeName) =>
            trx("attributes")
              .select("id")
              .where("name", "=", attributeName)
              .first()
          )
        );

        const productAttributeInsertQuery = trx("product_attributes").insert(
          attributeIds.map((attributeId, index) => ({
            product_id: productId,
            attribute_id: attributeId.id,
            value: updates.attributes[Object.keys(updates.attributes)[index]],
          }))
        );

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
  }
);

export const deleteProduct = asyncWrapper(async (req, res) => {
  const id = Number(req.params.id);
  const numDeleted = await db("products").where({ id }).del();
  res.status(200).send(`Deleted ${numDeleted} product.`);
});
