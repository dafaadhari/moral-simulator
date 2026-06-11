import { useState } from 'react';
import { TextArea } from '../atoms/TextArea';
import { Button } from '../atoms/Button';

export const DilemmaForm = ({ scenario, onAnalyze }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [reason, setReason] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = () => {
    if (!selectedOption) return alert("Pilih salah satu tindakan dulu!");
    if (!reason.trim()) return alert("Jangan lupa ketik alasan utamanya!");
    
    setIsAnalyzing(true);
    
    const chosenOptionData = scenario.options.find(opt => opt.id === selectedOption);
    
    onAnalyze({
      scenarioTitle: scenario.title,
      chosenOption: chosenOptionData,
      userReason: reason
    }, () => setIsAnalyzing(false)); 
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 border border-slate-100">
      {/* Skenario Cerita */}
      <div className="mb-8 text-center">
        <span className="bg-white text-slate-700 px-4 py-1.5 rounded-full text-[10px] font-bold border border-slate-200 shadow-sm uppercase tracking-[0.15em] mb-4 inline-block">
          Skenario #{scenario.id}: {scenario.title}
        </span>
        <p className="text-lg text-slate-700 leading-relaxed italic">
          "{scenario.context}"
        </p>
      </div>

      {/* Pilihan Opsi Ganda */}
      <div className="space-y-4 mb-8">
        <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider text-center">
          Pilih Tindakanmu:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenario.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedOption(opt.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedOption === opt.id 
                  ? 'border-slate-900 bg-slate-50 text-slate-950 shadow-md ring-1 ring-slate-900' 
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 text-slate-500 hover:text-slate-700'
              }`}
            >
              <span className="font-bold block mb-1">Opsi {opt.id}</span>
              <span className="text-sm">{opt.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Kolom Alasan (Mulai menyala jika opsi sudah dipilih) */}
      <div className={`transition-all duration-500 ${selectedOption ? 'opacity-100 h-auto' : 'opacity-50 pointer-events-none'}`}>
        <TextArea 
          label="Mengapa kamu memilih tindakan tersebut?"
          placeholder="Jujur saja, ketik alasan utamanya di sini..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <Button onClick={handleSubmit} isLoading={isAnalyzing}>
          Analisis Keputusan Saya
        </Button>
      </div>
    </div>
  );
};