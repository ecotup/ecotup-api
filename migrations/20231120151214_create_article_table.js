exports.up = function(knex) {
  return knex.schema.hasTable("tbl_article").then((exists) => {
    if (exists) {
      return knex.schema.dropTable("tbl_article");
    } else {
      return knex.schema.createTable("tbl_article", function(table) {
        table.increments("article_id").primary();
        table.string("article_image");
        table.string("article_name");
        table.string("article_author");
        table.string("article_link");
        table.date("article_date");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tbl_article");
};
