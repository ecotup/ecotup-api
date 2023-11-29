exports.up = function(knex) {
  return knex.schema.hasTable('tbl_user').then((exists) => {
    if (exists) {
      return knex.schema.dropTable("tbl_user");
    } else {
      return knex.schema.createTable("tbl_user", function(table) {
        table.increments("user_id").primary();
        table.string("user_name").notNullable();
        table.string("user_password").notNullable();
        table.string("user_email").notNullable().unique();
        table.string("user_phone", 14).notNullable();
        table.double("user_longitude").notNullable();
        table.double("user_latitude").notNullable();
        table.string("user_profile");
        table.integer("user_point").defaultTo(0);
        table.string("user_token");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tbl_user");
};
