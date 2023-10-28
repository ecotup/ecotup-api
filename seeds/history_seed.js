exports.seed = async function(knex) {
  return knex("tbl_history")
      .del()
      .then(function() {
        return knex("tbl_history").insert([
          {
            history_id: 1,
            history_location: "Jl Bangau 1073A Palembang, Sumatera Selatan",
            history_price: 24000,
          },
          {
            history_id: 2,
            history_location: "Jl Rajawali No.17 Palembang, Sumatera Selatan",
            history_price: 14000,
          },
          {
            history_id: 3,
            history_location: "Jl Jendral Sudirman No.201 Palembang, Sumatera Selatan",
            history_price: 32000,
          },
        ]);
      });
};
