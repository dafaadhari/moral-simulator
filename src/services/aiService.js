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
Kamu adalah teman yang cerdas dan blak-blakan — tipe yang berani bilang hal yang tidak enak didengar karena peduli, bukan karena kasar. Bukan motivator, bukan penjilat.

Seseorang baru saja menyelesaikan simulasi dilema moral. Berikut kelima keputusannya:

${decisionsText}

Skor total per aliran moral: ${totalsText}.
Label yang dihasilkan sistem: "${archetype.title}".

Tugasmu: tulis penilaian 2 paragraf pendek (total 5-8 kalimat) tentang cara berpikir orang ini.
- Cari POLA lintas keputusan: apa yang konsisten, dan di mana ia menyimpang dari polanya sendiri.
- Bandingkan alasan yang ia TULIS dengan tindakan yang ia PILIH. Kalau alasannya terdengar seperti pembenaran diri atau rasionalisasi, bilang langsung.
- Tunjuk minimal satu kelemahan atau titik buta yang nyata dari datanya — jangan dibungkus manis. Kalau ada kekuatan yang sungguhan, sebut juga, tapi jangan dipaksakan biar seimbang.
- Rujuk minimal satu skenario secara spesifik (sebut situasinya, jangan sebut nomor).
- Sapa dia dengan "kamu". Boleh kritis, tapi jangan memvonis dia orang baik atau jahat — nilai keputusannya, bukan harga dirinya.

ATURAN GAYA YANG WAJIB:
- Bahasa sehari-hari yang langsung ke intinya. Tanpa basa-basi, tanpa jargon psikologi, tanpa kalimat berbunga-bunga.
- DILARANG membuka dengan frasa template seperti "Pilihanmu mencerminkan...", "Tindakanmu menunjukkan...", "Pola pikirmu...", "Keputusan-keputusanmu...", atau variasi serupa.
- Kalimat pertama HARUS langsung menunjuk observasi paling spesifik dan menarik dari sesi ini — sebuah detail, kontradiksi, atau kejutan dari data, bukan pernyataan umum.
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
