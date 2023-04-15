import AppError from "../util/appError";
import asyncWrapper from "../util/asyncWrapper";
import db from "../util/database";

interface Category {
  id: number;
  name: string;
  parent_id?: number;
  is_active: boolean;
}

export const createNewCategory = asyncWrapper(async (req, res) => {
  const { name, parent_id } = req.body;

  const category: Category[] = await db("categories").insert({
    name,
    parent_id,
  });
  res.status(201).json({
    status: "success",
    message: "category created successfully",
    data: category,
  });
});

export const getAllCategories = asyncWrapper(async (req, res) => {
  const categories: Category[] = await db("categories");
  res.status(200).json({
    status: "success",
    message: `Successfully get all ${categories.length} category`,
    data: categories,
  });
});

export const getACategory = asyncWrapper(async (req, res, next) => {
  const id = Number(req.params.id);

  const category: Category = await db("categories").where({ id }).first();
  if (!category) {
    return next(
      new AppError(`Can not find any category with that id: ${id} `, 404)
    );
  }
  res.status(200).json({
    status: "success",
    message: `Successfully get category with that id ${id}`,
    data: category,
  });
});

export const updateCategory = asyncWrapper(async (req, res, next) => {
  const id = Number(req.params.id);
  const { name, parent_id, is_active } = req.body;

  const category: Category[] = await db("categories")
    .where({ id })
    .update({ name, parent_id, is_active });
  if (!category) {
    return next(
      new AppError(`Can not find any category with that id: ${id} `, 404)
    );
  }
  res.status(200).json({
    status: "success",
    message: `Successfully updated category with that id ${id}`,
    data: category,
  });
});

export const deleteCategory = asyncWrapper(async (req, res, next) => {
  const id = Number(req.params.id);
  const numDeleted = await db("categories").where({ id }).del();
  if (!numDeleted) {
    return next(
      new AppError(`Can not find any category with that id: ${id} `, 404)
    );
  }
  res.status(200).send(`Deleted ${numDeleted} category.`);
});
