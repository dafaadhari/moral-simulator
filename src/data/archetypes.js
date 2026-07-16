export const ARCHETYPES = {
  kepatuhan: {
    title: "Sang Penjaga Keteraturan",
    description: "Anda memiliki komitmen yang tak tergoyahkan terhadap aturan dan integritas sistem. Bagi Anda, keadilan sejati hanya bisa dicapai jika prosedur ditegakkan tanpa pandang bulu."
  },
  empati: {
    title: "Sang Pelindung Kemanusiaan",
    description: "Hati nurani adalah kompas utama Anda. Anda bersedia membengkokkan atau bahkan melanggar sistem yang kaku jika itu berarti menyelamatkan seseorang dari penderitaan."
  },
  pragmatisme: {
    title: "Sang Realis Pragmatis",
    description: "Anda adalah pemikir taktis. Anda tidak terjebak pada dogma atau emosi sesaat, melainkan berfokus pada hasil akhir yang paling efisien dan membawa keuntungan terbesar (atau kerugian terkecil) di dunia nyata."
  },
  keadilan: {
    title: "Sang Penegak Keadilan",
    description: "Kesetaraan adalah harga mati bagi Anda. Anda menimbang setiap pihak dengan takaran yang sama — dan bila aturan justru melahirkan ketimpangan, Anda tak segan menggugat aturan itu sendiri."
  },
  keutamaan: {
    title: "Sang Pemegang Integritas",
    description: "Pertanyaan Anda bukan \"apa yang dibolehkan\", melainkan \"jadi orang macam apa saya jika melakukannya\". Kejujuran dan keutuhan karakter Anda tidak bisa ditawar, bahkan ketika jalan itu paling sulit."
  }
};

// Menentukan arketipe dari skor total; seri ≥2 aliran → "Sang Penyeimbang"
export const resolveArchetype = (scores) => {
  const maxScore = Math.max(...Object.keys(ARCHETYPES).map(key => scores[key]));
  const winners = Object.keys(ARCHETYPES).filter(key => scores[key] === maxScore);

  if (winners.length > 1) {
    return {
      winners,
      maxScore,
      title: "Sang Penyeimbang",
      description: `Kompas moral Anda tidak berpihak pada satu kutub. Nilai ${winners
        .map(k => k.charAt(0).toUpperCase() + k.slice(1))
        .join(" dan ")} sama-sama menuntun keputusan Anda — sebuah keseimbangan yang langka antara prinsip-prinsip yang sering dianggap bertentangan.`
    };
  }

  return { winners, maxScore, ...ARCHETYPES[winners[0]] };
};
