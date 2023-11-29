exports.up = function(knex) {
  return knex.schema.hasTable("tbl_subscription").then((exists) => {
    if (exists) {
      return knex.schema.dropTable("tbl_subscription");
    } else {
      return knex.schema.createTable("tbl_subscription", function(table) {
        table.increments("subscription_id").primary();
        table.string("subscription_status").defaultTo(null);
        table.integer("subscription_value").defaultTo(0);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tbl_subscription");
};
