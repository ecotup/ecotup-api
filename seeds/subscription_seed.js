exports.seed = async function(knex) {
  return knex("tbl_subscription")
      .del()
      .then(function() {
        return knex("tbl_subscription").insert([
          {
            subscription_id: 1,
            subscription_status: "One Time",
            subscription_value: 1,
          },
          {
            subscription_id: 2,
            subscription_status: "Weekly",
            subscription_value: 7,
          },
          {
            subscription_id: 3,
            subscription_status: "Monthly",
            subscription_value: 30,
          },
        ]);
      });
};
