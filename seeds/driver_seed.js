exports.seed = async function(knex) {
  return knex("tbl_driver")
      .del()
      .then(function() {
        return knex("tbl_driver").insert([
          {
            driver_id: 1,
            driver_name: "Rudi Hermanto",
            driver_password:
              "$2b$10$R2gSdoessccnj0IeYRmXN.7h4eShKlMTwiD61hNl5Yw/vct3zuZua",
            driver_email: "Rudi@gmail.com",
            driver_phone: "082178558890",
            driver_longitude: 1.1235235,
            driver_latitude: 1.1235235,
            driver_point: 0,
            driver_type: "Truck",
            driver_license: "BG 2024 HE",
          },
          {
            driver_id: 2,
            driver_name: "Yohannes Maryanto",
            driver_password:
              "$2b$10$R2gSdoessccnj0IeYRmXN.7h4eShKlMTwiD61hNl5Yw/vct3zuZua",
            driver_email: "Yohannes@gmail.com",
            driver_phone: "082178538795",
            driver_longitude: 1.1235235,
            driver_latitude: 1.1235235,
            driver_point: 0,
            driver_type: "Car",
            driver_license: "BG 2928 HH",
          },
          {
            driver_id: 3,
            driver_name: "Joko Anwar",
            driver_password:
              "$2b$10$R2gSdoessccnj0IeYRmXN.7h4eShKlMTwiD61hNl5Yw/vct3zuZua",
            driver_email: "Joko@gmail.com",
            driver_phone: "082172418705",
            driver_longitude: 1.1235235,
            driver_latitude: 1.1235235,
            driver_point: 0,
            driver_type: "Motorcycle",
            driver_license: "B 1624 HA",
          },
        ]);
      });
};
