exports.up = function(knex) {
  return knex.schema.hasTable('tbl_reward').then((exists) => {
    if (exists) {
      return knex.schema.dropTable("tbl_reward");
    } else {
      return knex.schema.createTable("tbl_reward", function(table) {
        table.increments("reward_id").primary();
        table.string("reward_image");
        table.string("reward_name");
        table.string("reward_price");
        table.string("reward_description");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tbl_reward");
};
