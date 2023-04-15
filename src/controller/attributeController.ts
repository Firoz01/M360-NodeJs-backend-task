import AppError from "../util/appError";
import asyncWrapper from "../util/asyncWrapper";
import db from "../util/database";

interface Attribute {
  id?: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export const createAttribute = asyncWrapper(async (req, res) => {
  const { name } = req.body;

  const attribute: Attribute[] = await db("attributes").insert({ name });
  res.status(201).json({
    status: "success",
    message: `Successfully created attribute`,
    data: attribute,
  });
});

export const getAllAttribute = asyncWrapper(async (req, res) => {
  const attributes: Attribute[] = await db("attributes");
  res.status(200).json({
    status: "success",
    message: `Successfully get all ${attributes.length} attributes`,
    data: attributes,
  });
});

export const getOneAttribute = asyncWrapper(async (req, res, next) => {
  const id = Number(req.params.id);
  const attribute: Attribute = await db("attributes").where({ id }).first();
  if (!attribute) {
    return next(new AppError(`Attribute not found with that id :${id}`, 404));
  }
  res.status(200).json({
    status: "success",
    message: `Successfully find attribute with that id:${id}`,
    data: attribute,
  });
});

export const updateAttribute = asyncWrapper(async (req, res, next) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const attribute: Attribute[] = await db("attributes")
    .where({ id })
    .update({ name });
  if (!attribute) {
    return next(new AppError(`Attribute not found with that id :${id}`, 404));
  }
  res.status(200).json({
    status: "success",
    message: `Successfully update attribute with that id :${id}`,
    data: attribute,
  });
});

export const deleteAttribute = asyncWrapper(async (req, res, next) => {
  const id = Number(req.params.id);
  const numDeleted = await db("attributes").where({ id }).del();
  if (!numDeleted) {
    return next(new AppError(`Attribute not found with that id :${id}`, 404));
  }
  res.status(200).send(`Deleted ${numDeleted} attribute.`);
});
