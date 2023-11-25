exports.up = function(knex) {
  return knex.schema.createTable("tbl_transaction", function(table) {
    table.increments("transaction_id").primary();
    table.float("transaction_longitude").notNullable();
    table.float("transaction_latitude").notNullable();
    table.integer("transaction_total").notNullable();
    table.string("transaction_description");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tbl_transaction");
};
