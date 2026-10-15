# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Tamu undangan pernikahan yang menerima tautan personal (terutama dibuka di smartphone melalui pesan WhatsApp atau media sosial) untuk mengetahui rincian jadwal, lokasi acara, memberikan konfirmasi kehadiran (RSVP), mengirimkan ucapan/doa restu, dan memberikan amplop digital atau hadiah.

## Product Purpose
Menyajikan undangan pernikahan digital interaktif yang elegan, hangat, dan informatif, sekaligus memudahkan mempelai dalam mendistribusikan informasi dan mengelola konfirmasi kehadiran tamu secara otomatis melalui integrasi Google Sheets.

## Positioning
Undangan web interaktif berbasis React dan Tailwind CSS yang ringan dan mobile-friendly, terhubung ke Google Sheets sebagai CMS real-time tanpa ketergantungan pada backend database server yang rumit.

## Operating Context
Diakses secara langsung dari browser smartphone (Safari iOS, Chrome Android, in-app browser WhatsApp/Instagram) melalui jaringan seluler. Menuntut waktu muat (load time) yang cepat, navigasi vertikal yang mulus, dan konsumsi data yang efisien.

## Capabilities and Constraints
- Integrasi Google Sheets API/AppScript sebagai live CMS (jadwal acara, galeri foto, nomor rekening, dan data ucapan).
- Gerbang pembuka (Welcome Overlay / Envelope) untuk memulai interaksi pengguna sekaligus memicu pemutaran audio latar (mematuhi browser autoplay policy).
- Formulir RSVP dan buku tamu interaktif dengan pembaruan daftar ucapan secara langsung.
- Fitur Amplop Digital dengan tombol salin nomor rekening instan dan alamat kirim kado fisik.
- Integrasi tautan navigasi Google Maps untuk rute lokasi resepsi dan akad.

## Brand Commitments
- Nama proyek: Ethereal Wedding Invitation
- Tone: Sakral, hangat, personal, dan intim.

## Evidence on Hand
- Komponen antarmuka yang ada: `src/components/` (Hero, Couple, EventDetails, RSVPForm, Gift, Gallery, WelcomeOverlay).
- Skema data CMS: `src/types.ts` (`WebData`, `EventType`, `WishType`, `GiftData`).

## Product Principles
1. Mobile-First & Lightweight: Mengutamakan kenyamanan layar ponsel cerdas dengan scrolling halus, keterbacaan tinggi, dan aset ringan.
2. Frictionless Guest Experience: Memudahkan tamu menangkap waktu, tempat, peta rute, dan mengisi RSVP dalam hitungan detik.
3. Live CMS Synchronized: Seluruh konten detail acara dan daftar doa restu dapat dikelola dinamis melalui spreadsheet tanpa perlu deploy ulang kode.
