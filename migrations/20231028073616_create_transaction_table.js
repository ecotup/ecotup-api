exports.up = function(knex) {
  return knex.schema.hasTable('tbl_transaction').then((exists) => {
    if (exists) {
      return knex.schema.dropTable("tbl_transaction");
    } else {
      return knex.schema.createTable("tbl_transaction", function(table) {
        table.increments("transaction_id").primary();
        table.double("transaction_longitude_start").notNullable();
        table.double("transaction_latitude_start").notNullable();
        table.double("transaction_longitude_destination").notNullable();
        table.double("transaction_latitude_destination").notNullable();
        table.string("transaction_description");
        table.double("transaction_total_payment").notNullable();
        table.double("transaction_total_weight").notNullable();
        table.integer("transaction_total_point");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tbl_transaction");
};
