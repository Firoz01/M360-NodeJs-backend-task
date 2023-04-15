import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("categories", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("parent_id").unsigned().nullable();
    table.foreign("parent_id").references("categories.id").onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("description").nullable();
    table.integer("price").unsigned().nullable();
    table.integer("quantity").unsigned().nullable();
    table.integer("category_id").unsigned().notNullable();
    table
      .foreign("category_id")
      .references("categories.id")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("product_categories", function (table) {
    table
      .integer("product_id")
      .unsigned()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });

  await knex.schema.createTable("attributes", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("product_attributes", (table) => {
    table.increments("id").primary();
    table.integer("product_id").unsigned().notNullable();
    table.foreign("product_id").references("products.id").onDelete("CASCADE");
    table.integer("attribute_id").unsigned().notNullable();
    table
      .foreign("attribute_id")
      .references("attributes.id")
      .onDelete("CASCADE");
    table.string("value").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("product_attributes");
  await knex.schema.dropTableIfExists("product_categories");
  await knex.schema.dropTableIfExists("attributes");
  await knex.schema.dropTableIfExists("products");
  await knex.schema.dropTableIfExists("categories");
}
