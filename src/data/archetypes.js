// Arketipe ditulis dua sisi: kekuatan nyata + titik buta/biayanya.
// Gaya bahasa: ceplas ceplos, sapaan "kamu", tanpa gelar dramatis.
export const ARCHETYPES = {
  kepatuhan: {
    title: "Pemegang Aturan",
    description: "Kamu main lewat prosedur. Bagusnya: kamu konsisten dan omonganmu bisa dipegang. Buruknya: aturan sering kamu pakai jadi tameng — biar bukan kamu yang disalahkan kalau hasilnya menyakiti orang. Ikut aturan itu gampang; yang susah itu bertanggung jawab atas akibatnya."
  },
  empati: {
    title: "Penolong",
    description: "Perasaanmu jalan duluan sebelum logika, dan orang di sekitarmu beruntung karenanya. Tapi kamu gampang pilih kasih: yang kamu tolong biasanya yang paling dekat atau paling terlihat menderita, bukan yang paling butuh. Dan kamu target empuk untuk dimanipulasi lewat cerita sedih."
  },
  pragmatisme: {
    title: "Pemburu Hasil",
    description: "Buat kamu, yang penting beres — dan memang sering beres. Tapi kamu gampang memperlakukan orang sebagai angka, dan tergoda memotong kompas kalau tidak ada yang lihat. Reputasi yang dibangun bertahun-tahun bisa habis oleh satu jalan pintas yang ketahuan."
  },
  keadilan: {
    title: "Pengadil",
    description: "Semua harus dapat takaran yang sama — kamu konsisten soal itu, bahkan berani melawan aturan yang timpang. Masalahnya, hidup jarang serapi timbanganmu. Kesetaraanmu bisa berubah kaku dan dingin: memukul rata orang-orang yang kondisinya jelas tidak rata."
  },
  keutamaan: {
    title: "Penjaga Integritas",
    description: "Kamu tidak mau bohong dan tidak mau pura-pura. Terhormat. Tapi jujur saja: kadang kejujuranmu lebih tentang menjaga rasa bersihmu sendiri daripada menolong siapa pun. Merasa benar itu candu — dan sering kali orang lain yang kena getahnya."
  }
};

// Menentukan arketipe dari skor total; seri ≥2 aliran → hasil ambigu, katakan apa adanya
export const resolveArchetype = (scores) => {
  const maxScore = Math.max(...Object.keys(ARCHETYPES).map(key => scores[key]));
  const winners = Object.keys(ARCHETYPES).filter(key => scores[key] === maxScore);

  if (winners.length > 1) {
    return {
      winners,
      maxScore,
      title: "Penyeimbang — atau Peragu",
      description: `Skormu seri antara ${winners
        .map(k => k.charAt(0).toUpperCase() + k.slice(1))
        .join(" dan ")}. Ada dua kemungkinan: kamu memang luwes membaca situasi, atau kamu belum punya pendirian dan ikut arah angin. Lima keputusan belum cukup membuktikan yang mana — tapi kamu sendiri biasanya tahu jawabannya.`
    };
  }

  return { winners, maxScore, ...ARCHETYPES[winners[0]] };
};
