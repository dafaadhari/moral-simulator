import { useState } from 'react';
import { Header } from './components/organisms/Header.jsx';
import { Footer } from './components/organisms/Footer.jsx';
import { DilemmaForm } from './components/organisms/DilemmaForm.jsx';
import { ResultCard } from './components/organisms/ResultCard.jsx';
import { WelcomeScreen } from './components/templates/WelcomeScreen.jsx';
import { FinalProfile } from './components/templates/FinalProfile.jsx';
import { scenarios } from './data/scenarios.js';
import { analyzeMoralChoice } from './services/aiService.js';

// Memanggil AI dan mengubah hasil/gagal menjadi bentuk yang seragam
const fetchInsight = async (submission) => {
  try {
    const insight = await analyzeMoralChoice(
      submission.scenarioTitle,
      submission.chosenOption.text,
      submission.userReason
    );
    return { insight, aiFailed: false };
  } catch (error) {
    return { insight: error.message, aiFailed: true };
  }
};

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [resultData, setResultData] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  // Simpan submission terakhir agar analisis AI bisa diulang saat gagal
  const [lastSubmission, setLastSubmission] = useState(null);

  // "Buku Catatan": akumulasi skor + riwayat perjalanan untuk rekap akhir
  const [totalScores, setTotalScores] = useState({ kepatuhan: 0, empati: 0, pragmatisme: 0 });
  const [history, setHistory] = useState([]);

  const currentScenario = scenarios[currentStep];

  const handleAnalyzeMoral = async (userSubmission, stopLoading) => {
    setLastSubmission(userSubmission);

    // 1. Tambahkan bobot pilihan user saat ini ke total skor keseluruhan
    const weights = userSubmission.chosenOption.weights;
    setTotalScores(prev => ({
      kepatuhan: prev.kepatuhan + weights.kepatuhan,
      empati: prev.empati + weights.empati,
      pragmatisme: prev.pragmatisme + weights.pragmatisme
    }));

    // 2. Panggil AI
    const { insight, aiFailed } = await fetchInsight(userSubmission);

    stopLoading();

    // 3. Tampilkan kartu hasil per skenario
    setResultData({
      scenarioTitle: userSubmission.scenarioTitle,
      values: [
        `Kepatuhan: ${weights.kepatuhan}`,
        `Empati: ${weights.empati}`,
        `Pragmatisme: ${weights.pragmatisme}`
      ],
      selectedAction: userSubmission.chosenOption.text,
      userReason: userSubmission.userReason,
      insight,
      aiFailed
    });
  };

  // Ulangi hanya panggilan AI-nya — skor sudah tercatat, tidak dihitung dua kali
  const handleRetryInsight = async () => {
    setIsRetrying(true);
    const { insight, aiFailed } = await fetchInsight(lastSubmission);
    setResultData(prev => ({ ...prev, insight, aiFailed }));
    setIsRetrying(false);
  };

  const handleNextScenario = () => {
    // Catat hasil skenario ini ke riwayat untuk rekap di profil akhir
    setHistory(prev => [...prev, {
      title: resultData.scenarioTitle,
      action: resultData.selectedAction,
      reason: resultData.userReason,
      insight: resultData.insight,
      aiFailed: resultData.aiFailed
    }]);

    setResultData(null);

    if (currentStep < scenarios.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Jika soal sudah habis, ganti layar ke Profil Akhir
      setIsFinished(true);
    }
  };

  // Fungsi untuk me-reset semuanya ke kondisi semula (titik nol)
  const handleRestartSimulation = () => {
    setHasStarted(false);
    setCurrentStep(0);
    setIsFinished(false);
    setTotalScores({ kepatuhan: 0, empati: 0, pragmatisme: 0 });
    setHistory([]);
    setLastSubmission(null);
  };

  return (
    <div className="bg-vanilla-100 text-navy-900 font-sans min-h-screen flex flex-col pt-10 px-4 md:px-6">
      <div className="max-w-4xl mx-auto w-full flex flex-col flex-grow">
        <Header />

        {/* Sistem Navigasi Layar */}
        <main className="flex-grow">
          {!hasStarted ? (
            <WelcomeScreen onStart={() => setHasStarted(true)} />
          ) : isFinished ? (
            <FinalProfile scores={totalScores} history={history} onRestart={handleRestartSimulation} />
          ) : !resultData ? (
            <DilemmaForm scenario={currentScenario} onAnalyze={handleAnalyzeMoral} />
          ) : (
            <ResultCard
              data={resultData}
              onReset={handleNextScenario}
              onRetry={handleRetryInsight}
              isRetrying={isRetrying}
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
