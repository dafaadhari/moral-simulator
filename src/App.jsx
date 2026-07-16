import { useState } from 'react';
import { Header } from './components/organisms/Header.jsx';
import { Footer } from './components/organisms/Footer.jsx';
import { DilemmaForm } from './components/organisms/DilemmaForm.jsx';
import { WelcomeScreen } from './components/templates/WelcomeScreen.jsx';
import { FinalProfile } from './components/templates/FinalProfile.jsx';
import { pickSessionScenarios } from './data/scenarios.js';
import { resolveArchetype } from './data/archetypes.js';
import { generateMoralResume } from './services/aiService.js';

const EMPTY_SCORES = { kepatuhan: 0, empati: 0, pragmatisme: 0, keadilan: 0, keutamaan: 0 };

function App() {
  // 5 skenario acak dari pool — di-set saat sesi dimulai
  const [sessionScenarios, setSessionScenarios] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // "Buku Catatan": akumulasi skor + riwayat keputusan untuk resume & rekap akhir
  const [totalScores, setTotalScores] = useState(EMPTY_SCORES);
  const [history, setHistory] = useState([]);

  // Resume AI tunggal di akhir sesi: 'loading' | 'done' | 'failed'
  const [resume, setResume] = useState({ status: 'loading', text: '' });

  const currentScenario = sessionScenarios?.[currentStep];

  const handleStart = () => {
    setSessionScenarios(pickSessionScenarios());
    setCurrentStep(0);
    setTotalScores(EMPTY_SCORES);
    setHistory([]);
    setIsFinished(false);
  };

  const requestResume = async (entries, totals) => {
    setResume({ status: 'loading', text: '' });
    try {
      const text = await generateMoralResume(entries, totals, resolveArchetype(totals));
      setResume({ status: 'done', text });
    } catch (error) {
      setResume({ status: 'failed', text: error.message });
    }
  };

  // Dipanggil setelah user menegaskan pilihan lewat modal konfirmasi.
  // Tidak ada panggilan AI di tengah sesi — skor tersembunyi sampai akhir.
  const handleDecide = ({ chosenOption, userReason }) => {
    const weights = chosenOption.weights;
    const newTotals = Object.fromEntries(
      Object.keys(totalScores).map(key => [key, totalScores[key] + weights[key]])
    );
    const newHistory = [...history, {
      title: currentScenario.title,
      context: currentScenario.context,
      action: chosenOption.text,
      reason: userReason
    }];

    setTotalScores(newTotals);
    setHistory(newHistory);

    if (currentStep < sessionScenarios.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
      requestResume(newHistory, newTotals);
    }
  };

  // Ulangi hanya panggilan AI-nya — skor & riwayat tidak berubah
  const handleRetryResume = () => requestResume(history, totalScores);

  const handleRestart = () => {
    setSessionScenarios(null);
    setCurrentStep(0);
    setIsFinished(false);
    setTotalScores(EMPTY_SCORES);
    setHistory([]);
    setResume({ status: 'loading', text: '' });
  };

  return (
    <div className="bg-vanilla-100 text-navy-900 font-sans min-h-screen flex flex-col pt-10 px-4 md:px-6">
      <div className="max-w-4xl mx-auto w-full flex flex-col flex-grow">
        <Header />

        {/* Sistem Navigasi Layar */}
        <main className="flex-grow">
          {!sessionScenarios ? (
            <WelcomeScreen onStart={handleStart} />
          ) : isFinished ? (
            <FinalProfile
              scores={totalScores}
              history={history}
              resume={resume}
              onRetryResume={handleRetryResume}
              onRestart={handleRestart}
            />
          ) : (
            <DilemmaForm
              key={currentScenario.id}
              scenario={currentScenario}
              number={currentStep + 1}
              total={sessionScenarios.length}
              onDecide={handleDecide}
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
