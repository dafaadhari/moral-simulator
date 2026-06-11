// src/components/organisms/ResultCard.jsx

export const ResultCard = ({ data, onReset }) => {
  if (!data) return null;

  return (
    <div className="space-y-12 animate-[fadeIn_0.5s_ease-in-out]">
      
      {/* 1. Matriks Nilai (Dari Sistem) */}
      <div className="text-center">
        <h3 className="font-medium text-slate-500 text-xs uppercase tracking-[0.2em] mb-6">
          Kalkulasi Bobot Sistem
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {data.values.map((v, index) => (
            <span 
              key={index} 
              className="bg-white text-slate-800 px-5 py-2 rounded-full text-xs font-semibold border border-slate-100 shadow-sm uppercase tracking-wider"
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Tindakan vs Alasan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card Kiri: Tindakan yang Dipilih */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-slate-800"></div>
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
            <span className="w-2 h-2 rounded-full bg-slate-800"></span>
            <h3 className="font-bold text-slate-950 text-base">Tindakan Pilihanmu</h3>
          </div>
          <p className="text-slate-800 leading-relaxed font-medium">
            {data.selectedAction}
          </p>
        </div>

        {/* Card Kanan: Alasan Pengguna */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-slate-300"></div>
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <h3 className="font-bold text-slate-950 text-base">Alasan Pribadi</h3>
          </div>
          <p className="text-slate-600 leading-relaxed italic">
            "{data.userReason}"
          </p>
        </div>
      </div>

      {/* 3. Insight AI */}
      <div className="bg-slate-950 text-white p-10 rounded-2xl shadow-2xl shadow-slate-200 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xl">💡</span>
            <h3 className="font-bold text-white text-base uppercase tracking-wider">
              Analisis Konsistensi (Oleh AI)
            </h3>
          </div>
          <p className="text-lg leading-relaxed font-light text-slate-200 italic">
            {data.insight}
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-900 opacity-20 rounded-full blur-2xl"></div>
      </div>

      {/* Tombol Reset */}
      <div className="text-center pt-4">
        <button 
          onClick={onReset} 
          className="px-6 py-3 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50 transition text-sm font-medium"
        >
          ← Analisis Skenario Lain
        </button>
      </div>
    </div>
  );
};