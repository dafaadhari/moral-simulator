# Moral Reasoning Simulator

Simulator dilema moral berbahasa Indonesia. User menjalani 5 skenario (diambil acak dari pool 10), memilih tindakan + menulis alasan, lalu di akhir mendapat arketipe moral + satu resume AI (Gemini) yang mensintesis seluruh keputusannya.

**Status: frontend MVP selesai dan berfungsi penuh.** Fase berikutnya (sesi selanjutnya): setup Supabase sesuai arsitektur v2 — lihat bagian Roadmap di bawah.

## Perintah

```bash
npm run dev      # dev server
npm run build    # build produksi
npm run lint     # eslint (wajib bersih sebelum commit)
```

Setup: salin `.env.example` → `.env.local`, isi `VITE_GEMINI_API_KEY` (key dari https://aistudio.google.com/apikey). Tanpa key, app tetap jalan — hanya resume AI yang menampilkan pesan konfigurasi.

## Stack & struktur

React 19 + Vite 8 + Tailwind 4 (token tema di `src/index.css`), JavaScript (belum TypeScript). Komponen pola atomic: `atoms/` (Button, TextArea, Modal), `organisms/` (Header, Footer, DilemmaForm), `templates/` (WelcomeScreen, FinalProfile).

File kunci:
- `src/data/scenarios.js` — pool 10 skenario + `pickSessionScenarios()` (Fisher-Yates, ambil 5)
- `src/data/archetypes.js` — 5 arketipe + `resolveArchetype(scores)` (seri → "Sang Penyeimbang")
- `src/services/aiService.js` — `generateMoralResume()`, model `gemini-3.5-flash`, temperature 1.1
- `src/App.jsx` — seluruh state alur (sessionScenarios, totalScores, history, resume)

## Invarian desain — JANGAN dilanggar

1. **Aturan juara bobot**: setiap skenario punya tepat 5 opsi; setiap opsi juara (bobot 10) di TEPAT SATU aliran (kepatuhan/empati/pragmatisme/keadilan/keutamaan); setiap aliran punya tepat satu juara per skenario. Ini yang menjamin subset acak mana pun seimbang (maks 50/aliran/sesi). Kalau menambah/mengubah skenario, verifikasi ulang dengan simulasi (skrip assert: 1 juara per aliran per skenario + 1000 sesi acak maks selalu 50).
2. **Bobot non-juara**: rentang 2–6, masuk akal secara etis terhadap isi opsinya.
3. **Tidak ada panggilan AI di tengah sesi** — skor & analisis disembunyikan sampai akhir agar jawaban tidak bias. Satu-satunya panggilan AI adalah resume akhir.
4. **Prompt resume anti-formula**: larangan frasa pembuka template + kewajiban membuka dengan observasi spesifik + temperature 1.1. Jangan dikembalikan ke prompt kaku per-keputusan.
5. **Urutan aliran pada opsi A–E diacak antar skenario** — jangan diseragamkan, nanti polanya bisa dihafal.
6. **Selera desain user**: layout terbuka per seksi, KARTU HANYA untuk unit kecil (opsi, skor) — jangan bungkus konten dalam satu kartu besar; tanpa ornamen dekoratif (❦ ✦, border ganda); palet Light Vanilla `#FFF7E6` + Midnight Navy `#0A122A` (token `vanilla-*`/`navy-*`); Fraunces untuk judul.
7. Modal konfirmasi hanya di keputusan ke-5 (terakhir), bukan tiap skenario.

## Keamanan API key

`VITE_*` ter-inline ke bundle browser — key Gemini saat ini TEREKSPOS jika di-deploy publik. Aman untuk dev lokal/demo. Jangan deploy publik sebelum migrasi v2 selesai.

## Roadmap — SESI BERIKUTNYA: setup Supabase (arsitektur v2)

Blueprint lengkap: `docs/architecture-v2.md`. Inti: tanpa auth, `session_id` anonim (UUID di localStorage); semua akses DB dan panggilan Gemini pindah ke Edge Function `moral-analysis` (key jadi secret server, anon key nol akses tabel, tanpa RLS); deploy frontend ke Vercel.

Urutan kerja yang disepakati (kondensasi Sprint 0–5 blueprint):
1. `supabase init` + project, migration schema, revoke anon
2. Edge Function: validasi input → panggil Gemini → tulis DB → return
3. Frontend: `useSession` (localStorage UUID), API client ke Edge Function, hapus `@google/generative-ai` dari bundle
4. Vercel: env vars, CORS, `vercel.json`

**PENTING — blueprint perlu adaptasi**: dokumen v2 ditulis untuk desain lama (input cerita bebas `input_story` 20–2000 karakter, TypeScript, React Router, TanStack Query). Aplikasi sekarang berbasis skenario. Yang harus disesuaikan saat implementasi: kontrak request Edge Function menjadi `{ session_id, entries[], totals, archetype }` (5 keputusan + skor), schema `moral_analyses` menyesuaikan, dan keputusan apakah ikut migrasi ke TS/Router/Query atau tetap stack sekarang — tanyakan ke user dulu, jangan diasumsikan.

Backlog lain (tidak mendesak): migrasi SDK ke `@google/genai` (yang lama deprecated, sekalian saat Edge Function), tes unit `resolveArchetype` + keseimbangan bobot, focus trap keyboard di Modal.
