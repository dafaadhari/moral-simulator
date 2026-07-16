import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Menyusun satu resume moral dari SELURUH keputusan dalam satu sesi.
// entries: [{ title, context, action, reason }], totals: skor per aliran,
// archetype: { title, description } hasil resolveArchetype.
// Melempar Error dengan pesan yang layak tampil ke user; pemanggil yang
// memutuskan cara menampilkannya + menawarkan retry.
export const generateMoralResume = async (entries, totals, archetype) => {
  if (!apiKey) {
    throw new Error(
      "Analisis AI belum aktif karena API key belum dikonfigurasi. Salin .env.example menjadi .env.local dan isi VITE_GEMINI_API_KEY."
    );
  }

  const decisionsText = entries
    .map((e, i) =>
      `${i + 1}. Skenario "${e.title}": ${e.context}\n` +
      `   Tindakan yang dipilih: "${e.action}"\n` +
      `   Alasan tertulis pengguna: "${e.reason}"`
    )
    .join("\n\n");

  const totalsText = Object.entries(totals)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  const prompt = `
Anda adalah seorang psikolog dan ahli etika yang menulis dengan gaya esais — tajam, hangat, dan tidak menghakimi.

Seorang pengguna baru saja menyelesaikan simulasi dilema moral. Berikut kelima keputusannya:

${decisionsText}

Skor total per aliran moral: ${totalsText}.
Arketipe yang dihasilkan sistem: "${archetype.title}".

Tugas Anda: tulis resume moral 2 paragraf pendek (total 5-8 kalimat) tentang cara berpikir orang ini.
- Cari POLA lintas keputusan: apa yang konsisten, dan di keputusan mana ia menyimpang dari polanya sendiri?
- Bandingkan alasan yang ia TULIS dengan tindakan yang ia PILIH — apakah selaras, atau ada ketegangan tersembunyi?
- Rujuk minimal satu skenario secara spesifik (sebut situasinya, jangan sebut nomor).
- Sapa pengguna dengan "Anda". Jangan menghakimi benar/salah.

ATURAN GAYA YANG WAJIB:
- DILARANG membuka dengan frasa template seperti "Pilihan Anda mencerminkan...", "Tindakan Anda menunjukkan...", "Pola pikir Anda...", "Keputusan-keputusan Anda...", atau variasi serupa.
- Kalimat pertama HARUS langsung menunjuk observasi paling spesifik dan menarik dari sesi ini — sebuah detail, ketegangan, atau kejutan dari data, bukan pernyataan umum.
- Tanpa format markdown, tanpa daftar. Prosa mengalir saja.
  `;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      generationConfig: { temperature: 1.1 }
    });

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error AI:", error);
    throw new Error("Gerbang logika AI sedang terganggu. Silakan coba susun ulang.", { cause: error });
  }
};
