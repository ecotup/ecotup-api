exports.up = function(knex) {
  return knex.schema.createTable("tbl_article", function(table) {
    table.increments("article_id").primary();
    table.string("article_name").defaultTo(null);
    table.integer("article_link").defaultTo(0);
    table.date("article_date");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tbl_article");
};
