exports.up = function(knex) {
  return knex.schema.createTable("tbl_history", function(table) {
    table.increments("history_id").primary();
    table.string("history_location").notNullable();
    table.integer("history_price").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tbl_history");
};
