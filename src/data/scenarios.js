export const scenarios = [
  {
    id: 1,
    title: "Dilema Sang Pekerja",
    context: "Kamu mengetahui rekan kerjamu mengambil sebagian kecil dana kas perusahaan untuk biaya pengobatan anaknya yang sedang kritis. Aturan perusahaan mewajibkan pelaporan untuk setiap kecurangan, dan sanksinya adalah pemecatan.",
    options: [
      {
        id: "A",
        text: "Laporkan sesuai prosedur perusahaan",
        weights: { kepatuhan: 10, empati: 2, pragmatisme: 5 }
      },
      {
        id: "B",
        text: "Tutup mata dan bantu tutupi kekurangannya",
        weights: { kepatuhan: 2, empati: 10, pragmatisme: 3 }
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
        weights: { kepatuhan: 10, empati: 8, pragmatisme: 2 }
      },
      {
        id: "B",
        text: "Rilis sesuai jadwal dan diam-diam perbaiki di update berikutnya",
        weights: { kepatuhan: 3, empati: 2, pragmatisme: 10 }
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
        weights: { kepatuhan: 5, empati: 10, pragmatisme: 2 }
      },
      {
        id: "B",
        text: "Prioritaskan proyek komersial demi arus kas perusahaan",
        weights: { kepatuhan: 8, empati: 2, pragmatisme: 10 }
      }
    ]
  }
];