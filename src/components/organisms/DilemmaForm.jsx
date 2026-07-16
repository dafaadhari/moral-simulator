import { useState } from 'react';
import { TextArea } from '../atoms/TextArea';
import { Button } from '../atoms/Button';
import { Modal } from '../atoms/Modal';

export const DilemmaForm = ({ scenario, number, total, onDecide }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [reason, setReason] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const chosenOptionData = scenario.options.find(opt => opt.id === selectedOption);
  const isLast = number === total;

  const handleSubmit = () => {
    if (!selectedOption) return setValidationError("Pilih salah satu tindakan dulu.");
    if (!reason.trim()) return setValidationError("Tulis alasan di balik pilihanmu dulu.");
    setValidationError(null);

    // Skenario 1-4 langsung lanjut; modal penegasan hanya di keputusan terakhir
    if (isLast) {
      setShowConfirm(true);
    } else {
      onDecide({ chosenOption: chosenOptionData, userReason: reason });
    }
  };

  // Dipanggil setelah user menegaskan pilihannya lewat modal
  const handleConfirm = () => {
    setShowConfirm(false);
    onDecide({ chosenOption: chosenOptionData, userReason: reason });
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Seksi 1: Skenario — tipografi terbuka, tanpa kartu */}
      <section>
        <p className="text-xs font-bold text-navy-900/40 uppercase tracking-[0.2em] mb-3">
          Skenario {number} dari {total}
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 tracking-tight mb-5">
          {scenario.title}
        </h2>
        <p className="text-lg text-navy-900/75 leading-relaxed max-w-3xl">
          {scenario.context}
        </p>
      </section>

      {/* Seksi 2: Pilihan — daftar vertikal, 5 opsi */}
      <section>
        <p className="text-sm font-bold text-navy-900 mb-4">Pilih tindakanmu</p>
        <div className="space-y-3">
          {scenario.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedOption(opt.id)}
              className={`w-full flex items-start gap-4 p-5 rounded-xl border text-left transition-all ${
                selectedOption === opt.id
                  ? 'border-navy-900 bg-navy-900 text-vanilla-50 shadow-lg'
                  : 'border-navy-900/15 bg-vanilla-50 hover:border-navy-900/40 text-navy-900/70 hover:text-navy-900'
              }`}
            >
              <span className={`font-display font-bold shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-sm ${
                selectedOption === opt.id
                  ? 'bg-vanilla-50 text-navy-900'
                  : 'bg-navy-900/5 text-navy-900'
              }`}>
                {opt.id}
              </span>
              <span className="text-sm md:text-base leading-relaxed pt-1">{opt.text}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Seksi 3: Alasan (menyala jika opsi sudah dipilih) */}
      <section className={`transition-all duration-500 max-w-2xl ${selectedOption ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
        <TextArea
          label="Mengapa kamu memilih tindakan tersebut?"
          placeholder="Jujur saja, ketik alasan utamanya di sini..."
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            if (validationError) setValidationError(null);
          }}
        />
        {validationError && (
          <p className="mt-3 text-sm font-medium text-red-700" role="alert">
            {validationError}
          </p>
        )}
        <Button onClick={handleSubmit}>
          {number < total ? "Kunci Keputusan & Lanjut" : "Kunci Keputusan Terakhir"}
        </Button>
      </section>

      {/* Modal penegasan — hanya muncul di keputusan terakhir, sebelum profil tampil */}
      {isLast && (
        <Modal
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          title="Ini keputusan terakhirmu. Yakin?"
          actions={
            <>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-3 border border-navy-900/20 rounded-xl text-navy-900/70 hover:bg-navy-50 hover:text-navy-900 transition text-sm font-semibold"
              >
                Pikirkan Lagi
              </button>
              <button
                onClick={handleConfirm}
                className="px-6 py-3 bg-navy-900 hover:bg-navy-800 text-vanilla-50 rounded-xl transition text-sm font-bold shadow-md"
              >
                Ya, Tampilkan Profilku
              </button>
            </>
          }
        >
          <p className="text-sm leading-relaxed">
            Untuk skenario penutup ini kamu memilih <strong>Opsi {chosenOptionData?.id}</strong>:
          </p>
          <p className="font-display italic mt-2 text-navy-900">
            "{chosenOptionData?.text}"
          </p>
          <p className="text-xs mt-4 text-navy-900/50">
            Setelah ini seluruh keputusanmu dikunci dan profil moralmu akan disusun.
          </p>
        </Modal>
      )}
    </div>
  );
};
