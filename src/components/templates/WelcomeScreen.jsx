import { Button } from '../atoms/Button.jsx';

const MATRICES = [
  {
    title: "Kepatuhan",
    description: "Seberapa kuat Anda berpegang pada aturan, hukum, dan prosedur yang berlaku."
  },
  {
    title: "Empati",
    description: "Kepedulian Anda terhadap kondisi emosional dan penderitaan individu lain."
  },
  {
    title: "Pragmatisme",
    description: "Fokus pada hasil akhir, efisiensi, dan solusi paling logis di lapangan."
  }
];

export const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero terbuka, tanpa kartu pembungkus */}
      <section className="max-w-2xl mb-14">
        <p className="text-xs font-bold text-navy-900/40 uppercase tracking-[0.2em] mb-4">
          Fase Inisiasi
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 tracking-tight mb-6 leading-tight">
          Selamat Datang di Gerbang Logika
        </h2>
        <p className="text-lg text-navy-900/75 leading-relaxed">
          Anda akan dihadapkan pada serangkaian skenario dilema. Tidak ada jawaban benar atau salah. Sistem ini akan mengkalkulasi keputusan Anda berdasarkan tiga matriks utama.
        </p>
      </section>

      {/* Tiga matriks sebagai kartu terpisah */}
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
          AI akan membaca alasan di balik setiap keputusan Anda untuk memastikan konsistensi pola pikir.
        </p>
        <Button onClick={onStart}>Mulai Simulasi</Button>
      </section>
    </div>
  );
};
