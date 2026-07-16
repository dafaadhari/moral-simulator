// Tiga matriks memetakan kerangka etika:
// Kepatuhan ≈ deontologi, Empati ≈ etika kepedulian, Pragmatisme ≈ konsekuensialisme.
// Desain bobot: tiap sumbu punya tepat satu opsi "juara" (bobot 10) di tiap skenario,
// sehingga skor maksimum ketiga sumbu simetris (30) dan tidak ada arketipe yang
// secara struktural lebih sulit dicapai.
export const scenarios = [
  {
    id: 1,
    title: "Dilema Sang Pekerja",
    context: "Kamu mengetahui rekan kerjamu mengambil sebagian kecil dana kas perusahaan untuk biaya pengobatan anaknya yang sedang kritis. Aturan perusahaan mewajibkan pelaporan untuk setiap kecurangan, dan sanksinya adalah pemecatan.",
    options: [
      {
        id: "A",
        text: "Laporkan sesuai prosedur perusahaan",
        weights: { kepatuhan: 10, empati: 2, pragmatisme: 4 }
      },
      {
        id: "B",
        text: "Tutup mata dan bantu tutupi kekurangannya",
        weights: { kepatuhan: 2, empati: 10, pragmatisme: 3 }
      },
      {
        id: "C",
        text: "Tegur empat mata: minta ia mengganti dana diam-diam agar kas kembali seimbang tanpa ada yang tahu",
        weights: { kepatuhan: 3, empati: 6, pragmatisme: 10 }
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
        text: "Tunda rilis dan perbaiki celahnya sekarang juga",
        weights: { kepatuhan: 10, empati: 6, pragmatisme: 4 }
      },
      {
        id: "B",
        text: "Rilis sesuai jadwal dan diam-diam perbaiki di update berikutnya",
        weights: { kepatuhan: 2, empati: 2, pragmatisme: 10 }
      },
      {
        id: "C",
        text: "Beritahu klien secara terbuka soal celah dan risikonya, lalu putuskan bersama",
        weights: { kepatuhan: 6, empati: 10, pragmatisme: 5 }
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
        text: "Alihkan semua material ke proyek fasilitas kesehatan",
        weights: { kepatuhan: 4, empati: 10, pragmatisme: 2 }
      },
      {
        id: "B",
        text: "Prioritaskan proyek komersial demi arus kas perusahaan",
        weights: { kepatuhan: 3, empati: 2, pragmatisme: 10 }
      },
      {
        id: "C",
        text: "Ikuti urutan kontrak yang ditandatangani lebih dulu, tanpa memihak siapa pun",
        weights: { kepatuhan: 10, empati: 4, pragmatisme: 5 }
      }
    ]
  }
];
