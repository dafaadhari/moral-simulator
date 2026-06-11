import { useState } from 'react';
import { Header } from './components/organisms/Header.jsx';
import { DilemmaForm } from './components/organisms/DilemmaForm.jsx';
import { ResultCard } from './components/organisms/ResultCard.jsx';
import { WelcomeScreen } from './components/templates/WelcomeScreen.jsx';
import { FinalProfile } from './components/templates/FinalProfile.jsx'; // <-- Import Layar Akhir
import { scenarios } from './data/scenarios.js';
import { analyzeMoralChoice } from './services/aiService.js';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); 
  const [resultData, setResultData] = useState(null);
  const [isFinished, setIsFinished] = useState(false); // <-- Penanda simulasi tamat

  // State "Buku Catatan" untuk mengakumulasi skor selama simulasi
  const [totalScores, setTotalScores] = useState({ kepatuhan: 0, empati: 0, pragmatisme: 0 });
  
  const currentScenario = scenarios[currentStep];

  const handleAnalyzeMoral = async (userSubmission, stopLoading) => {
    // 1. Tambahkan bobot pilihan user saat ini ke total skor keseluruhan
    const weights = userSubmission.chosenOption.weights;
    setTotalScores(prev => ({
      kepatuhan: prev.kepatuhan + weights.kepatuhan,
      empati: prev.empati + weights.empati,
      pragmatisme: prev.pragmatisme + weights.pragmatisme
    }));

    // 2. Panggil AI
    const aiInsight = await analyzeMoralChoice(
      userSubmission.scenarioTitle,
      userSubmission.chosenOption.text,
      userSubmission.userReason
    );

    stopLoading();
    
    // 3. Tampilkan kartu hasil per skenario
    setResultData({
      values: [
        `Kepatuhan: ${weights.kepatuhan}`, 
        `Empati: ${weights.empati}`,
        `Pragmatisme: ${weights.pragmatisme}`
      ],
      selectedAction: userSubmission.chosenOption.text,
      userReason: userSubmission.userReason,
      insight: aiInsight
    });
  };

  const handleNextScenario = () => {
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
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans min-h-screen py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        {/* Sistem Navigasi Layar */}
        {!hasStarted ? (
          <WelcomeScreen onStart={() => setHasStarted(true)} />
        ) : isFinished ? (
          <FinalProfile scores={totalScores} onRestart={handleRestartSimulation} />
        ) : !resultData ? (
          <DilemmaForm scenario={currentScenario} onAnalyze={handleAnalyzeMoral} />
        ) : (
          <ResultCard data={resultData} onReset={handleNextScenario} />
        )}
        
      </div>
    </div>
  );
}

export default App;