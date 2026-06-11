import { Button } from '../atoms/Button.jsx';

export const FinalProfile = ({ scores, onRestart }) => {
  // Mencari skor tertinggi untuk menentukan "Arketipe" atau julukan moral user
  const maxScore = Math.max(scores.kepatuhan, scores.empati, scores.pragmatisme);
  
  let archetype = "";
  let description = "";

  if (maxScore === scores.kepatuhan) {
    archetype = "Sang Penjaga Keteraturan";
    description = "Anda memiliki komitmen yang tak tergoyahkan terhadap aturan dan integritas sistem. Bagi Anda, keadilan sejati hanya bisa dicapai jika prosedur ditegakkan tanpa pandang bulu.";
  } else if (maxScore === scores.empati) {
    archetype = "Sang Pelindung Kemanusiaan";
    description = "Hati nurani adalah kompas utama Anda. Anda bersedia membengkokkan atau bahkan melanggar sistem yang kaku jika itu berarti menyelamatkan seseorang dari penderitaan.";
  } else {
    archetype = "Sang Realis Pragmatis";
    description = "Anda adalah pemikir taktis. Anda tidak terjebak pada dogma atau emosi sesaat, melainkan berfokus pada hasil akhir yang paling efisien dan membawa keuntungan terbesar (atau kerugian terkecil) di dunia nyata.";
  }

  return (
    <div className="bg-white p-10 md:p-14 rounded-2xl shadow-xl border border-slate-100 text-center animate-[fadeIn_0.8s_ease-in-out]">
      <div className="mb-6">
        <span className="bg-slate-900 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-md">
          Profil Moral Keseluruhan
        </span>
      </div>

      <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
        {archetype}
      </h2>
      <p className="text-slate-600 leading-relaxed mb-10 text-lg max-w-xl mx-auto italic">
        "{description}"
      </p>

      {/* Rincian Skor Akhir */}
      <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 mb-10">
        <h3 className="font-bold text-slate-400 uppercase tracking-[0.2em] text-xs mb-6">Distribusi Matriks (Total Skor)</h3>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-200 flex-1">
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Kepatuhan</span>
            <span className="text-3xl font-black text-slate-800">{scores.kepatuhan}</span>
          </div>
          <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-200 flex-1">
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Empati</span>
            <span className="text-3xl font-black text-slate-800">{scores.empati}</span>
          </div>
          <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-200 flex-1">
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Pragmatisme</span>
            <span className="text-3xl font-black text-slate-800">{scores.pragmatisme}</span>
          </div>
        </div>
      </div>

      <div className="max-w-xs mx-auto">
        <Button onClick={onRestart}>Ulangi Simulasi</Button>
      </div>
    </div>
  );
};