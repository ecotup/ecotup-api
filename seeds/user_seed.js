exports.seed = async function(knex) {
  return knex("tbl_user")
      .del()
      .then(function() {
        return knex("tbl_user").insert([
          {
            user_id: 1,
            user_name: "Kelvin William Chandra",
            user_password: "ksh1039ns",
            user_email: "Kelvin@gmail.com",
            user_phone: "082178558890",
            user_longitude: 1.1235235,
            user_latitude: 1.1235235,
            user_point: 0,
            user_roles: "driver",
          },
          {
            user_id: 2,
            user_name: "Candra",
            user_password: "c1bikcj4",
            user_email: "Candra@gmail.com",
            user_phone: "082178538795",
            user_longitude: 1.1235235,
            user_latitude: 1.1235235,
            user_point: 0,
          },
          {
            user_id: 3,
            user_name: "Rivaldo",
            user_password: "12345R",
            user_email: "Rivaldo@gmail.com",
            user_phone: "082172418705",
            user_longitude: 1.1235235,
            user_latitude: 1.1235235,
            user_point: 0,
            user_roles: "admin",
          },
        ]);
      });
};
