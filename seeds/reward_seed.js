exports.seed = async function(knex) {
  return knex("tbl_reward")
      .del()
      .then(function() {
        return knex("tbl_reward").insert([
          {
            reward_id: 1,
            reward_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB12Rsd6F3JzJQ1novS2OWsw5OniT7c1GPtFshoBjdUn8HdGj6ycEff5iwFErL0fhCFqI&usqp=CAU",
            reward_name: "Ecotup T-shirt",
            reward_price: 10000,
            reward_description: "Detail Produk: Kaos Ecotup Bahan: Katun 100% Desain: Eksklusif Perusahaan ecotup dengan berbagai macam warna mulai dari putih,hitam, dan hijau tersedia pada ukuran S,M,L, dan XL Cara Perawatan ketika ingin mencuci kaos cukup di rendam 30-40 menit lalu di keringkan",
          },
          {
            reward_id: 2,
            reward_image: "https://nutrilov.com/cdn/shop/products/NutrilovEco-FriendlyToteBag1_600x.jpg?v=1642074469",
            reward_name: "Ecotup Tote Bag",
            reward_price: 8000,
            reward_description: "Detail Produk: Tote Bag Perusahaan Ecotup Tote bag Perusahaan Ecotup merupakan solusi modern dan fungsional untuk kebutuhan sehari-hari. Dengan desain yang ringan, tas ini tidak hanya bergaya, tetapi juga dapat diandalkan dalam berbagai situasi, mulai dari bekerja hingga berbelanja.",
          },
          {
            reward_id: 3,
            reward_image: "https://images.tokopedia.net/img/cache/500-square/product-1/2017/2/4/2928953/2928953_ba364c9d-8f57-431f-8ae4-9b4e9a2575e4_600_600.jpg",
            reward_name: "Ecotup Trash Box",
            reward_price: 5000,
            reward_description: "Detail Produk: Kotak Sampah Perusahaan Ecotup Kotak sampah perusahaan Ecotup dirancang dengan konsep ergonomis dan modern untuk memenuhi kebutuhan pengelolaan sampah di lingkungan perkantoran. Dengan kapasitas optimal, kotak ini dapat mengakomodasi sampah sehari-hari dengan mudah, menjadikannya solusi yang praktis dan efisien.",
          },
        ]);
      });
};
