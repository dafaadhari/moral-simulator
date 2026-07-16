import { Button } from '../atoms/Button.jsx';

const ARCHETYPES = {
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
  }
};

export const FinalProfile = ({ scores, history = [], onRestart }) => {
  // Mencari skor tertinggi untuk menentukan "Arketipe" atau julukan moral user
  const maxScore = Math.max(scores.kepatuhan, scores.empati, scores.pragmatisme);
  const winners = Object.keys(ARCHETYPES).filter(key => scores[key] === maxScore);

  let archetype;
  let description;

  if (winners.length > 1) {
    // Seri: dua sumbu (atau lebih) sama kuat — jangan diam-diam memenangkan salah satunya
    archetype = "Sang Penyeimbang";
    description = `Kompas moral Anda tidak berpihak pada satu kutub. Nilai ${winners
      .map(k => k.charAt(0).toUpperCase() + k.slice(1))
      .join(" dan ")} sama-sama menuntun keputusan Anda — sebuah keseimbangan yang langka antara prinsip-prinsip yang sering dianggap bertentangan.`;
  } else {
    ({ title: archetype, description } = ARCHETYPES[winners[0]]);
  }

  return (
    <div className="animate-fade-in">
      {/* Arketipe — tipografi terbuka */}
      <section className="max-w-2xl mb-14">
        <p className="text-xs font-bold text-navy-900/40 uppercase tracking-[0.2em] mb-4">
          Profil Moral Keseluruhan
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 tracking-tight mb-6 leading-tight">
          {archetype}
        </h2>
        <p className="text-lg text-navy-900/75 leading-relaxed">
          {description}
        </p>
      </section>

      {/* Skor sebagai kartu terpisah */}
      <section className="mb-14">
        <p className="text-sm font-bold text-navy-900 mb-4">Distribusi matriks &mdash; total skor</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(ARCHETYPES).map((key) => {
            const isTop = scores[key] === maxScore;
            return (
              <div
                key={key}
                className={`p-6 rounded-xl border ${
                  isTop
                    ? 'bg-navy-900 border-navy-900 text-vanilla-50'
                    : 'bg-vanilla-50 border-navy-900/15 text-navy-900'
                }`}
              >
                <span className={`block text-xs font-bold uppercase tracking-widest mb-2 ${
                  isTop ? 'text-vanilla-100/70' : 'text-navy-900/50'
                }`}>
                  {key}
                </span>
                <span className="font-display text-4xl font-bold">{scores[key]}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Rekap perjalanan — pilihan & analisis AI per skenario */}
      {history.length > 0 && (
        <section className="mb-14">
          <p className="text-sm font-bold text-navy-900 mb-4">Rekap perjalananmu</p>
          <div className="space-y-4">
            {history.map((item, i) => (
              <div key={i} className="p-6 bg-vanilla-50 border border-navy-900/15 rounded-xl">
                <p className="text-xs font-bold text-navy-900/40 uppercase tracking-[0.2em] mb-2">
                  Skenario {i + 1} &mdash; {item.title}
                </p>
                <p className="text-navy-900 font-medium mb-1">{item.action}</p>
                <p className="text-sm text-navy-900/60 mb-4">Alasanmu: "{item.reason}"</p>
                {!item.aiFailed && (
                  <p className="font-display text-sm text-navy-900/75 italic leading-relaxed border-l-2 border-navy-900/20 pl-4">
                    {item.insight}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-md">
        <Button onClick={onRestart}>Ulangi Simulasi</Button>
      </section>
    </div>
  );
};
