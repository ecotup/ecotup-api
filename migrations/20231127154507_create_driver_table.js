exports.up = function(knex) {
  return knex.schema.hasTable('tbl_driver').then((exists) => {
    if (exists) {
      return knex.schema.dropTable("tbl_driver");
    } else {
      return knex.schema.createTable("tbl_driver", function(table) {
        table.increments("driver_id").primary();
        table.string("driver_name").notNullable();
        table.string("driver_password").notNullable();
        table.string("driver_email").notNullable().unique();
        table.string("driver_phone", 14).notNullable();
        table.double("driver_longitude").notNullable();
        table.double("driver_latitude").notNullable();
        table.string("driver_type");
        table.float("driver_rating").defaultTo(5.0);
        table.string("driver_license");
        table.string("driver_profile");
        table.integer("driver_point").defaultTo(0);
        table.string("driver_token");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tbl_driver");
};
