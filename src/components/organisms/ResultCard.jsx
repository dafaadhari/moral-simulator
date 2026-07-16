// src/components/organisms/ResultCard.jsx

export const ResultCard = ({ data, onReset }) => {
  if (!data) return null;

  return (
    <div className="space-y-12 animate-fade-in">

      {/* 1. Matriks Nilai (Dari Sistem) */}
      <section>
        <p className="text-sm font-bold text-navy-900 mb-4">Kalkulasi bobot sistem</p>
        <div className="flex flex-wrap gap-3">
          {data.values.map((v, index) => (
            <span
              key={index}
              className="bg-vanilla-50 text-navy-900 px-5 py-2 rounded-full text-xs font-semibold border border-navy-900/15 uppercase tracking-wider"
            >
              {v}
            </span>
          ))}
        </div>
      </section>

      {/* 2. Tindakan vs Alasan */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-vanilla-50 p-7 rounded-xl border border-navy-900/15">
          <h3 className="text-xs font-bold text-navy-900/50 uppercase tracking-widest mb-3">
            Tindakan Pilihanmu
          </h3>
          <p className="text-navy-900 leading-relaxed font-medium">
            {data.selectedAction}
          </p>
        </div>

        <div className="bg-vanilla-50 p-7 rounded-xl border border-navy-900/15">
          <h3 className="text-xs font-bold text-navy-900/50 uppercase tracking-widest mb-3">
            Alasan Pribadi
          </h3>
          <p className="font-display text-navy-900/75 leading-relaxed italic">
            "{data.userReason}"
          </p>
        </div>
      </section>

      {/* 3. Insight AI — momen paling dramatis, satu-satunya blok navy pekat */}
      <section className="bg-navy-900 text-vanilla-50 p-8 md:p-10 rounded-2xl shadow-xl">
        <h3 className="text-xs font-bold text-vanilla-100/60 uppercase tracking-widest mb-4">
          Analisis Konsistensi &mdash; oleh AI
        </h3>
        <p className="font-display text-lg md:text-xl leading-relaxed text-vanilla-100">
          {data.insight}
        </p>
      </section>

      {/* Tombol Lanjut */}
      <section>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-navy-900 hover:bg-navy-800 text-vanilla-50 rounded-xl transition text-sm font-bold shadow-md"
        >
          Lanjut &rarr;
        </button>
      </section>
    </div>
  );
};
