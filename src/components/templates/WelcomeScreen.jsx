import { Button } from '../atoms/Button.jsx';

export const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="bg-white p-10 md:p-14 rounded-2xl shadow-xl border border-slate-100 text-center animate-[fadeIn_0.5s_ease-in-out]">
      <div className="mb-8">
        <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em]">
          Fase Inisiasi
        </span>
      </div>
      
      <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Selamat Datang di Gerbang Logika
      </h2>
      
      <p className="text-slate-600 leading-relaxed mb-8 text-lg">
        Anda akan dihadapkan pada serangkaian skenario dilema. Tidak ada jawaban benar atau salah. Sistem kami akan mengkalkulasi keputusan Anda berdasarkan tiga matriks utama:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
        <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
          <h3 className="font-bold text-slate-800 mb-2 uppercase tracking-wider text-sm">Kepatuhan</h3>
          <p className="text-sm text-slate-500">Seberapa kuat Anda berpegang pada aturan, hukum, dan prosedur yang berlaku.</p>
        </div>
        <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
          <h3 className="font-bold text-slate-800 mb-2 uppercase tracking-wider text-sm">Empati</h3>
          <p className="text-sm text-slate-500">Kepedulian Anda terhadap kondisi emosional dan penderitaan individu lain.</p>
        </div>
        <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
          <h3 className="font-bold text-slate-800 mb-2 uppercase tracking-wider text-sm">Pragmatisme</h3>
          <p className="text-sm text-slate-500">Fokus pada hasil akhir, efisiensi, dan solusi paling logis di lapangan.</p>
        </div>
      </div>

      <p className="text-slate-500 italic text-sm mb-8">
        "AI akan membantu membaca alasan di balik setiap keputusan Anda untuk memastikan konsistensi pola pikir."
      </p>

      <div className="max-w-xs mx-auto">
        <Button onClick={onStart}>Mulai Simulasi</Button>
      </div>
    </div>
  );
};