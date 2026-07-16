# Moral Reasoning Simulator

Simulator dilema moral berbasis web. Pengguna dihadapkan pada serangkaian skenario, memilih tindakan, lalu menuliskan alasannya. Sistem mengkalkulasi bobot keputusan pada tiga matriks — **Kepatuhan**, **Empati**, dan **Pragmatisme** — sementara AI (Gemini) membaca konsistensi antara tindakan yang dipilih dan alasan yang diberikan. Di akhir simulasi, akumulasi skor menentukan arketipe moral pengguna.

## Menjalankan secara lokal

```bash
npm install
cp .env.example .env.local   # lalu isi VITE_GEMINI_API_KEY
npm run dev
```

API key Gemini bisa diambil di [Google AI Studio](https://aistudio.google.com/apikey). Tanpa key, aplikasi tetap berjalan dan skor tetap terhitung — hanya bagian analisis AI yang menampilkan pesan bahwa key belum dikonfigurasi.

Skrip lain: `npm run build` (build produksi), `npm run preview` (pratinjau hasil build), `npm run lint`.

## Catatan sebelum deploy

Vite meng-inline semua variabel berawalan `VITE_` ke dalam bundle JavaScript yang dikirim ke browser. Artinya `VITE_GEMINI_API_KEY` akan terbaca oleh siapa pun yang membuka situs. Untuk dev lokal ini tidak masalah, tapi sebelum deploy publik, panggilan Gemini di `src/services/aiService.js` sebaiknya dipindah ke backend atau serverless function yang menyimpan key di sisi server.

## Struktur

Komponen mengikuti pola atomic design:

```
src/
├── components/
│   ├── atoms/       Button, TextArea
│   ├── organisms/   Header, DilemmaForm, ResultCard
│   └── templates/   WelcomeScreen, FinalProfile
├── data/scenarios.js    Skenario + bobot tiap opsi
└── services/aiService.js  Integrasi Gemini
```

Menambah skenario cukup dengan menambah entri di `src/data/scenarios.js` — setiap opsi butuh `weights` untuk ketiga matriks.
