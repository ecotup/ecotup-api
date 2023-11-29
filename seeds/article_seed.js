exports.seed = async function(knex) {
  return knex("tbl_article")
      .del()
      .then(function() {
        return knex("tbl_article").insert([
          {
            article_id: 1,
            article_name: "Solusi Asyik, Kurangi Sampah Plastik",
            article_author: "Admin Dinas",
            article_link:
              "https://dlh.semarangkota.go.id/solusi-asyik-kurangi-sampah-plastik/",
            article_date: "2023-01-12",
            article_image:
              "https://dlh.semarangkota.go.id/wp-content/uploads/2023/01/20230112_131639-560x420.jpg",
          },
          {
            article_id: 2,
            article_name: "5 Manfaat Pengolahan Sampah yang Baik",
            article_author: "Webmaster",
            article_link:
              "https://dlh.semarangkota.go.id/5-manfaat-pengolahan-sampah-yang-baik/",
            article_date: "2020-12-20",
            article_image:
              "https://dlh.semarangkota.go.id/wp-content/uploads/2021/02/wrodpress-com-2.jpg",
          },
          {
            article_id: "ATC-003",
            article_name: "Cara Sederhana Pilah Sampah dari Rumah",
            article_author: "Mita Defitri",
            article_link:
              "https://waste4change.com/blog/cara-sederhana-pilah-sampah-dari-rumah/",
            article_date: "2020-11-19",
            article_image:
              "https://waste4change.com/blog/wp-content/uploads/DSC03366-768x513.jpg",
          },
        ]);
      });
};
