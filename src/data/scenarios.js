// Lima matriks memetakan aliran etika:
//   kepatuhan   ≈ deontologi (aturan & kewajiban)
//   empati      ≈ etika kepedulian (penderitaan individu)
//   pragmatisme ≈ konsekuensialisme (hasil paling efisien)
//   keadilan    ≈ etika keadilan (kesetaraan, anti-favoritisme)
//   keutamaan   ≈ etika keutamaan (integritas karakter)
//
// Desain bobot: tiap skenario punya tepat SATU opsi juara (bobot 10) per aliran,
// sehingga subset skenario acak mana pun menghasilkan skor maksimum yang simetris.
// Urutan aliran pada opsi A-E sengaja diacak antar skenario agar pola tidak mudah ditebak.
export const scenarios = [
  {
    id: 1,
    title: "Rekan Kerja yang Mencuri",
    context: "Kamu mengetahui rekan kerjamu mengambil sebagian kecil dana kas perusahaan untuk biaya pengobatan anaknya yang sedang kritis. Aturan perusahaan mewajibkan pelaporan untuk setiap kecurangan, dan sanksinya adalah pemecatan.",
    options: [
      {
        id: "A",
        text: "Laporkan sesuai prosedur perusahaan",
        weights: { kepatuhan: 10, empati: 2, pragmatisme: 4, keadilan: 6, keutamaan: 5 }
      },
      {
        id: "B",
        text: "Tutup mata dan bantu tutupi kekurangannya",
        weights: { kepatuhan: 2, empati: 10, pragmatisme: 3, keadilan: 2, keutamaan: 3 }
      },
      {
        id: "C",
        text: "Tegur empat mata: minta ia mengganti dana diam-diam agar kas kembali seimbang tanpa ada yang tahu",
        weights: { kepatuhan: 3, empati: 6, pragmatisme: 10, keadilan: 4, keutamaan: 4 }
      },
      {
        id: "D",
        text: "Minta kasusnya diproses, tapi perjuangkan bantuan dana darurat untuk anaknya — setara dengan hak karyawan lain",
        weights: { kepatuhan: 6, empati: 6, pragmatisme: 3, keadilan: 10, keutamaan: 5 }
      },
      {
        id: "E",
        text: "Dampingi dia untuk mengakui sendiri perbuatannya ke manajemen",
        weights: { kepatuhan: 7, empati: 5, pragmatisme: 2, keadilan: 6, keutamaan: 10 }
      }
    ]
  },
  {
    id: 2,
    title: "Transparansi Sistem",
    context: "Dalam proyek pengembangan perangkat lunak, kamu menemukan celah keamanan yang sangat fatal tepat sehari sebelum jadwal rilis utama. Melaporkannya akan menunda rilis, membuat klien marah, dan memotong bonus seluruh tim. Mengabaikannya berpotensi membahayakan data pengguna di masa depan.",
    options: [
      {
        id: "A",
        text: "Rilis sesuai jadwal dan diam-diam perbaiki di update berikutnya",
        weights: { kepatuhan: 2, empati: 2, pragmatisme: 10, keadilan: 2, keutamaan: 2 }
      },
      {
        id: "B",
        text: "Tunda rilis dan perbaiki celahnya sekarang juga, sesuai prosedur keamanan",
        weights: { kepatuhan: 10, empati: 6, pragmatisme: 4, keadilan: 5, keutamaan: 7 }
      },
      {
        id: "C",
        text: "Utamakan yang paling rentan: amankan data pengguna dulu, lalu perjuangkan agar bonus tim tidak ikut dikorbankan",
        weights: { kepatuhan: 5, empati: 10, pragmatisme: 3, keadilan: 6, keutamaan: 5 }
      },
      {
        id: "D",
        text: "Beritahu klien apa adanya soal celah dan risikonya, lalu tanggung konsekuensinya",
        weights: { kepatuhan: 6, empati: 5, pragmatisme: 4, keadilan: 6, keutamaan: 10 }
      },
      {
        id: "E",
        text: "Buka faktanya ke semua pihak terdampak — tim, klien, manajemen — agar beban keputusan tidak dipikul satu orang",
        weights: { kepatuhan: 5, empati: 5, pragmatisme: 3, keadilan: 10, keutamaan: 6 }
      }
    ]
  },
  {
    id: 3,
    title: "Prioritas Distribusi Material",
    context: "Kamu adalah penanggung jawab logistik material. Stok baja dan semen tiba-tiba menipis. Kamu harus memilih antara mengirim material yang tersisa ke proyek fasilitas kesehatan umum yang mendesak namun tidak menguntungkan, atau ke proyek komersial klien VIP yang akan menjamin bonus besar bagi perusahaan.",
    options: [
      {
        id: "A",
        text: "Bagi material secara proporsional ke kedua proyek sesuai tingkat kebutuhan masing-masing",
        weights: { kepatuhan: 4, empati: 6, pragmatisme: 4, keadilan: 10, keutamaan: 5 }
      },
      {
        id: "B",
        text: "Alihkan semua material ke proyek fasilitas kesehatan",
        weights: { kepatuhan: 4, empati: 10, pragmatisme: 2, keadilan: 5, keutamaan: 6 }
      },
      {
        id: "C",
        text: "Ikuti urutan kontrak yang ditandatangani lebih dulu, tanpa memihak siapa pun",
        weights: { kepatuhan: 10, empati: 4, pragmatisme: 5, keadilan: 7, keutamaan: 4 }
      },
      {
        id: "D",
        text: "Prioritaskan proyek komersial demi arus kas perusahaan",
        weights: { kepatuhan: 3, empati: 2, pragmatisme: 10, keadilan: 2, keutamaan: 2 }
      },
      {
        id: "E",
        text: "Laporkan situasinya secara terbuka ke kedua klien dan direksi, sampaikan rekomendasi jujurmu",
        weights: { kepatuhan: 6, empati: 5, pragmatisme: 3, keadilan: 6, keutamaan: 10 }
      }
    ]
  },
  {
    id: 4,
    title: "Rahasia Sahabat",
    context: "Kamu memergoki sahabat karibmu berselingkuh. Pasangannya juga temanmu sejak lama, dan mereka akan menikah tiga bulan lagi.",
    options: [
      {
        id: "A",
        text: "Katakan langsung ke sahabatmu bahwa kamu tahu, dan kamu tidak bisa berpura-pura tidak melihat",
        weights: { kepatuhan: 4, empati: 5, pragmatisme: 4, keadilan: 6, keutamaan: 10 }
      },
      {
        id: "B",
        text: "Diam dan tidak ikut campur — bukan tempatmu mencampuri urusan pribadi orang lain",
        weights: { kepatuhan: 10, empati: 3, pragmatisme: 6, keadilan: 2, keutamaan: 2 }
      },
      {
        id: "C",
        text: "Temanmu yang dikhianati berhak tahu kebenaran yang sama seperti yang kamu tahu — beritahu dia",
        weights: { kepatuhan: 4, empati: 5, pragmatisme: 3, keadilan: 10, keutamaan: 7 }
      },
      {
        id: "D",
        text: "Dekati sahabatmu baik-baik dan cari tahu apa yang sebenarnya terjadi sebelum bertindak",
        weights: { kepatuhan: 4, empati: 10, pragmatisme: 5, keadilan: 3, keutamaan: 4 }
      },
      {
        id: "E",
        text: "Beri ultimatum ke sahabatmu: akhiri perselingkuhan dalam seminggu, atau kamu yang bicara",
        weights: { kepatuhan: 3, empati: 4, pragmatisme: 10, keadilan: 6, keutamaan: 6 }
      }
    ]
  },
  {
    id: 5,
    title: "Warisan yang Timpang",
    context: "Surat wasiat orang tuamu membagi warisan jauh lebih besar untukmu daripada adikmu — padahal dialah yang selama ini merawat mereka. Adikmu belum tahu detailnya, dan secara hukum semuanya sah.",
    options: [
      {
        id: "A",
        text: "Bagi ulang secara setara dengan adikmu, apa pun isi wasiatnya",
        weights: { kepatuhan: 3, empati: 7, pragmatisme: 3, keadilan: 10, keutamaan: 6 }
      },
      {
        id: "B",
        text: "Jalankan wasiat persis seperti tertulis — itu keputusan sah orang tuamu",
        weights: { kepatuhan: 10, empati: 2, pragmatisme: 6, keadilan: 2, keutamaan: 3 }
      },
      {
        id: "C",
        text: "Terima dulu sesuai wasiat; sisanya bisa diatur belakangan kalau muncul masalah",
        weights: { kepatuhan: 6, empati: 2, pragmatisme: 10, keadilan: 2, keutamaan: 2 }
      },
      {
        id: "D",
        text: "Tunjukkan isi wasiat apa adanya ke adikmu dan putuskan bersama secara terbuka",
        weights: { kepatuhan: 5, empati: 5, pragmatisme: 4, keadilan: 7, keutamaan: 10 }
      },
      {
        id: "E",
        text: "Perhatikan kebutuhan adikmu: bantu dia secara rutin diam-diam tanpa mengungkit wasiat",
        weights: { kepatuhan: 4, empati: 10, pragmatisme: 6, keadilan: 4, keutamaan: 3 }
      }
    ]
  },
  {
    id: 6,
    title: "Utang Teman Lama",
    context: "Teman lamamu masih menunggak utang besar padamu, dan kini datang lagi meminjam untuk biaya rumah sakit ibunya. Kamu punya uangnya — tapi itu tabungan rencana keluargamu sendiri.",
    options: [
      {
        id: "A",
        text: "Bantu lewat jalur lain yang tidak mengorbankan tabunganmu: galang donasi, hubungkan ke bantuan rumah sakit",
        weights: { kepatuhan: 4, empati: 6, pragmatisme: 10, keadilan: 5, keutamaan: 4 }
      },
      {
        id: "B",
        text: "Jujur padanya soal kondisimu dan kecewamu atas utang lama, lalu putuskan bersama pasanganmu",
        weights: { kepatuhan: 4, empati: 5, pragmatisme: 5, keadilan: 5, keutamaan: 10 }
      },
      {
        id: "C",
        text: "Berikan pinjaman itu — nyawa ibunya jauh lebih penting daripada tabunganmu",
        weights: { kepatuhan: 2, empati: 10, pragmatisme: 2, keadilan: 3, keutamaan: 5 }
      },
      {
        id: "D",
        text: "Tolak dengan tegas: sepakati dulu pelunasan utang lama sebelum ada pinjaman baru",
        weights: { kepatuhan: 10, empati: 2, pragmatisme: 7, keadilan: 6, keutamaan: 3 }
      },
      {
        id: "E",
        text: "Perlakukan seperti peminjam mana pun: bantu sebagian sesuai kemampuan, dengan kesepakatan tertulis",
        weights: { kepatuhan: 7, empati: 4, pragmatisme: 5, keadilan: 10, keutamaan: 3 }
      }
    ]
  },
  {
    id: 7,
    title: "Kompetisi Dua Sahabat",
    context: "Dua sahabatmu bersaing di kompetisi yang sama. Kamu tidak sengaja mengetahui salah satunya memalsukan sebagian karyanya — dan kamu satu-satunya yang tahu.",
    options: [
      {
        id: "A",
        text: "Desak dia menarik karyanya sendiri, agar semua peserta bertanding di lapangan yang setara",
        weights: { kepatuhan: 6, empati: 4, pragmatisme: 4, keadilan: 10, keutamaan: 6 }
      },
      {
        id: "B",
        text: "Bicara empat mata dengannya: pahami dulu kenapa ia sampai melakukannya",
        weights: { kepatuhan: 3, empati: 10, pragmatisme: 5, keadilan: 3, keutamaan: 4 }
      },
      {
        id: "C",
        text: "Laporkan ke panitia sesuai aturan kompetisi",
        weights: { kepatuhan: 10, empati: 2, pragmatisme: 3, keadilan: 7, keutamaan: 5 }
      },
      {
        id: "D",
        text: "Diam saja — bukan urusanmu, dan apa pun hasilnya persahabatan kalian tetap aman",
        weights: { kepatuhan: 2, empati: 3, pragmatisme: 10, keadilan: 2, keutamaan: 2 }
      },
      {
        id: "E",
        text: "Katakan padanya kamu tahu — dan kamu tidak akan berbohong jika suatu saat ditanya",
        weights: { kepatuhan: 5, empati: 4, pragmatisme: 3, keadilan: 6, keutamaan: 10 }
      }
    ]
  },
  {
    id: 8,
    title: "Janji pada Orang Tua",
    context: "Bertahun lalu kamu berjanji merawat orang tuamu di masa tua mereka. Kini datang tawaran karier impian di kota lain — gajinya cukup untuk membiayai perawat terbaik, tapi kamu tidak akan hadir secara fisik.",
    options: [
      {
        id: "A",
        text: "Ambil tawaran itu: perawat profesional ditambah kunjungan rutin adalah perawatan terbaik yang bisa diupayakan",
        weights: { kepatuhan: 2, empati: 3, pragmatisme: 10, keadilan: 4, keutamaan: 2 }
      },
      {
        id: "B",
        text: "Ajak saudara-saudaramu berbagi tanggung jawab secara adil — jangan pikul atau lepaskan semuanya sendirian",
        weights: { kepatuhan: 4, empati: 5, pragmatisme: 6, keadilan: 10, keutamaan: 4 }
      },
      {
        id: "C",
        text: "Tepati janjimu apa adanya: tolak tawaran itu dan tetap tinggal",
        weights: { kepatuhan: 10, empati: 6, pragmatisme: 2, keadilan: 3, keutamaan: 6 }
      },
      {
        id: "D",
        text: "Akui dengan jujur — pada dirimu dan orang tuamu — apa yang sanggup kamu jalani, lalu bangun ulang janji itu",
        weights: { kepatuhan: 5, empati: 6, pragmatisme: 4, keadilan: 5, keutamaan: 10 }
      },
      {
        id: "E",
        text: "Tanyakan dulu apa yang sebenarnya orang tuamu inginkan — ini soal perasaan mereka, bukan kariermu",
        weights: { kepatuhan: 4, empati: 10, pragmatisme: 4, keadilan: 5, keutamaan: 5 }
      }
    ]
  },
  {
    id: 9,
    title: "Hoaks di Grup Keluarga",
    context: "Pamanmu yang paling dihormati keluarga rutin menyebar tautan investasi bodong di grup keluarga. Beberapa kerabat mulai tertarik menyetorkan uang.",
    options: [
      {
        id: "A",
        text: "Dekati kerabat yang mulai tertarik satu per satu secara pribadi — lindungi mereka tanpa mempermalukan paman",
        weights: { kepatuhan: 4, empati: 10, pragmatisme: 6, keadilan: 4, keutamaan: 4 }
      },
      {
        id: "B",
        text: "Sampaikan faktanya terbuka di grup: semua kerabat berhak tahu risiko yang sama, siapa pun pengirimnya",
        weights: { kepatuhan: 5, empati: 4, pragmatisme: 3, keadilan: 10, keutamaan: 7 }
      },
      {
        id: "C",
        text: "Kirim artikel tentang penipuan serupa ke grup tanpa menyinggung siapa pun — biar mereka sadar sendiri",
        weights: { kepatuhan: 3, empati: 5, pragmatisme: 10, keadilan: 3, keutamaan: 2 }
      },
      {
        id: "D",
        text: "Hubungi pamanmu langsung: katakan dengan hormat bahwa itu penipuan dan kamu tidak akan diam",
        weights: { kepatuhan: 5, empati: 5, pragmatisme: 4, keadilan: 6, keutamaan: 10 }
      },
      {
        id: "E",
        text: "Laporkan tautan penipuan itu ke platform dan otoritas resmi",
        weights: { kepatuhan: 10, empati: 3, pragmatisme: 5, keadilan: 6, keutamaan: 4 }
      }
    ]
  },
  {
    id: 10,
    title: "Anak Sahabatku",
    context: "Di sekolah tempatmu bekerja, kamu memergoki anak sahabat karibmu merundung siswa lain dengan cukup serius. Prosedur sekolah jelas — tapi kamu tahu sahabatmu sedang berada di titik terendah hidupnya.",
    options: [
      {
        id: "A",
        text: "Selesaikan senyap: pertemukan kedua anak dan damaikan, tanpa catatan resmi yang membebani masa depan siapa pun",
        weights: { kepatuhan: 2, empati: 5, pragmatisme: 10, keadilan: 3, keutamaan: 3 }
      },
      {
        id: "B",
        text: "Proses sesuai prosedur sekolah, tanpa memandang siapa orang tuanya",
        weights: { kepatuhan: 10, empati: 3, pragmatisme: 4, keadilan: 7, keutamaan: 5 }
      },
      {
        id: "C",
        text: "Tangani dulu pemulihan anak yang dirundung, baru pikirkan langkah untuk pelakunya",
        weights: { kepatuhan: 4, empati: 10, pragmatisme: 4, keadilan: 5, keutamaan: 4 }
      },
      {
        id: "D",
        text: "Perlakukan kasus ini persis seperti kasus perundungan lainnya — setiap korban berhak atas perlindungan yang sama",
        weights: { kepatuhan: 7, empati: 5, pragmatisme: 3, keadilan: 10, keutamaan: 4 }
      },
      {
        id: "E",
        text: "Temui sahabatmu dan katakan langsung apa yang kamu lihat serta apa yang akan kamu lakukan",
        weights: { kepatuhan: 5, empati: 5, pragmatisme: 4, keadilan: 5, keutamaan: 10 }
      }
    ]
  }
];

// Fisher-Yates shuffle di atas salinan, ambil `count` skenario untuk satu sesi
export const pickSessionScenarios = (count = 5) => {
  const pool = [...scenarios];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
};
