import { Button } from '../atoms/Button.jsx';
import { ARCHETYPES, resolveArchetype } from '../../data/archetypes.js';

export const FinalProfile = ({ scores, history = [], resume, onRetryResume, onRestart }) => {
  const { title: archetype, description, maxScore } = resolveArchetype(scores);

  return (
    <div className="animate-fade-in">
      {/* Arketipe — tipografi terbuka */}
      <section className="max-w-2xl mb-14">
        <p className="text-xs font-bold text-navy-900/40 uppercase tracking-[0.2em] mb-4">
          Hasilmu
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 tracking-tight mb-6 leading-tight">
          {archetype}
        </h2>
        <p className="text-lg text-navy-900/75 leading-relaxed">
          {description}
        </p>
      </section>

      {/* Skor sebagai kartu terpisah — langsung di bawah judul arketipe */}
      <section className="mb-14">
        <p className="text-sm font-bold text-navy-900 mb-4">Skor per matriks</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.keys(ARCHETYPES).map((key) => {
            const isTop = scores[key] === maxScore;
            return (
              <div
                key={key}
                className={`p-5 rounded-xl border ${
                  isTop
                    ? 'bg-navy-900 border-navy-900 text-vanilla-50'
                    : 'bg-vanilla-50 border-navy-900/15 text-navy-900'
                }`}
              >
                <span className={`block text-[11px] font-bold uppercase tracking-widest mb-2 ${
                  isTop ? 'text-vanilla-100/70' : 'text-navy-900/50'
                }`}>
                  {key}
                </span>
                <span className="font-display text-3xl font-bold">{scores[key]}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Resume AI — momen paling dramatis */}
      <section className="mb-14 bg-navy-900 text-vanilla-50 p-8 md:p-10 rounded-2xl shadow-xl">
        <h3 className="text-xs font-bold text-vanilla-100/60 uppercase tracking-widest mb-4">
          Penilaian AI &mdash; apa adanya
        </h3>
        {resume.status === 'loading' ? (
          <p className="font-display text-lg leading-relaxed text-vanilla-100/70 italic animate-pulse">
            Membaca kelima keputusanmu...
          </p>
        ) : (
          <>
            <p className="font-display text-lg md:text-xl leading-relaxed text-vanilla-100 whitespace-pre-line">
              {resume.text}
            </p>
            {resume.status === 'failed' && (
              <button
                onClick={onRetryResume}
                className="mt-6 px-5 py-2.5 bg-vanilla-50 hover:bg-vanilla-100 text-navy-900 rounded-xl transition text-sm font-bold"
              >
                Coba Lagi
              </button>
            )}
          </>
        )}
      </section>

      {/* Rekap perjalanan — pilihan & alasan per skenario */}
      {history.length > 0 && (
        <section className="mb-14">
          <p className="text-sm font-bold text-navy-900 mb-4">Keputusanmu tadi</p>
          <div className="space-y-4">
            {history.map((item, i) => (
              <div key={i} className="p-6 bg-vanilla-50 border border-navy-900/15 rounded-xl">
                <p className="text-xs font-bold text-navy-900/40 uppercase tracking-[0.2em] mb-2">
                  Skenario {i + 1} &mdash; {item.title}
                </p>
                <p className="text-navy-900 font-medium mb-1">{item.action}</p>
                <p className="text-sm text-navy-900/60">Alasanmu: "{item.reason}"</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-md">
        <p className="text-sm text-navy-900/50 mb-2">
          Lima kasus diambil acak — sesi berikutnya beda.
        </p>
        <Button onClick={onRestart}>Ulangi</Button>
      </section>
    </div>
  );
};
