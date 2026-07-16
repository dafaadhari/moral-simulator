import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Melempar Error dengan pesan yang layak tampil ke user.
// Pemanggil (App) yang memutuskan cara menampilkannya + menawarkan retry.
export const analyzeMoralChoice = async (scenario, action, reason) => {
  if (!apiKey) {
    throw new Error(
      "Analisis AI belum aktif karena API key belum dikonfigurasi. Salin .env.example menjadi .env.local dan isi VITE_GEMINI_API_KEY."
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

    const prompt = `
      Anda adalah seorang psikolog dan ahli etika.
      Seorang pengguna dihadapkan pada skenario berikut: "${scenario}"

      Pengguna memilih tindakan: "${action}"
      Alasan yang diberikan pengguna: "${reason}"

      Tugas Anda:
      Berikan analisis singkat (maksimal 3-4 kalimat) mengenai pola pikir pengguna ini.
      Apakah alasan yang mereka berikan selaras dengan tindakan yang mereka pilih?
      Apakah ada pragmatisme tersembunyi, atau murni karena integritas moral?
      Jangan menghakimi, gunakan bahasa yang objektif, elegan, dan mendalam.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error AI:", error);
    throw new Error("Gerbang logika AI sedang terganggu. Silakan coba analisis ulang.", { cause: error });
  }
};
