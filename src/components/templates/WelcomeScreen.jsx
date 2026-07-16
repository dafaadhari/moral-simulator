import { Button } from '../atoms/Button.jsx';

const MATRICES = [
  {
    title: "Kepatuhan",
    description: "Seberapa kuat kamu berpegang pada aturan, hukum, dan prosedur yang berlaku."
  },
  {
    title: "Empati",
    description: "Kepedulianmu terhadap kondisi emosional dan penderitaan orang lain."
  },
  {
    title: "Pragmatisme",
    description: "Fokusmu pada hasil akhir, efisiensi, dan solusi paling logis di lapangan."
  },
  {
    title: "Keadilan",
    description: "Sejauh mana kamu menimbang semua pihak dengan takaran yang sama, tanpa pilih kasih."
  },
  {
    title: "Keutamaan",
    description: "Kesetiaanmu pada kejujuran dan integritas diri — bahkan saat itu jalan paling sulit."
  }
];

export const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero terbuka, tanpa kartu pembungkus */}
      <section className="max-w-2xl mb-14">
        <p className="text-xs font-bold text-navy-900/40 uppercase tracking-[0.2em] mb-4">
          Sebelum mulai
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 tracking-tight mb-6 leading-tight">
          Lima dilema. Tidak ada jawaban benar.
        </h2>
        <p className="text-lg text-navy-900/75 leading-relaxed">
          Pilih tindakanmu, tulis alasan jujurmu. Lima kasus diambil acak, jadi tiap sesi beda. Keputusanmu diukur lewat lima matriks:
        </p>
      </section>

      {/* Lima matriks sebagai kartu terpisah */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
        {MATRICES.map((m, i) => (
          <div key={m.title} className="p-6 bg-vanilla-50 border border-navy-900/15 rounded-xl">
            <span className="font-display text-sm text-navy-900/40 block mb-3">0{i + 1}</span>
            <h3 className="font-display font-bold text-navy-900 mb-2 text-lg">{m.title}</h3>
            <p className="text-sm text-navy-900/60 leading-relaxed">{m.description}</p>
          </div>
        ))}
      </section>

      <section className="max-w-md">
        <p className="text-sm text-navy-900/50 mb-2">
          Skormu disembunyikan sampai akhir. Setelah semua keputusan terkunci, AI menilai cara berpikirmu apa adanya — termasuk bagian yang tidak enak didengar.
        </p>
        <Button onClick={onStart}>Mulai</Button>
      </section>
    </div>
  );
};
