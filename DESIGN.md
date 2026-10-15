# Design System: Impeccable Wedding Suite

<!-- impeccable:design-schema 1 -->

## Incumbent System: Trifold Wax Letter (Active Default)

Ethereal Wedding Invitation menerapkan filosofi desain warkat fisik klasik bersurat lipat tiga (*Trifold Wax Letter*): perpaduan antara kertas perkamen alami berserat halus (*parchment paper*), segel lilin wax seal timbul merah wine, prangko pos perforasi, cap pos gelombang (*postmark cancellation*), dan aksen pita pos udara (*airmail ribbon*).

### 1. Palette & Material Strategy
- **Strategi Warna:** *Epistolary Romance & Vintage Parchment*
- **Canvas / Background:** `#EAE1D5` (Warm Parchment Paper)
- **Card Surface:** `#FDFBF7` (Soft Fine Stationery Letter)
- **Primary Accent:** `#8C1C2E` (Deep Wine Red Wax Seal)
- **Typography Ink:** `#2F241F` (Vintage Sepia Charcoal)
- **Border Hairlines:** `#DFD5C8`

---

## 4 Saved Design Variants (Distinct Layout Architecture & Sequencing)

Seluruh 4 varian memiliki **susunan urutan seksi yang berbeda, ornamen tematik eksklusif**, dan palet warna yang khas sehingga setiap varian terasa seperti media fisik yang otentik dan berani:

| No | ID Tema | Nama Varian | Palet & Nuansa | Susunan Urutan Layout & Karakteristik Unik |
|---|---|---|---|---|
| 1 | `trifold` | **Trifold Wax Letter** | Parchment `#EAE1D5`, Wine Red `#8C1C2E`, Sepia `#2F241F` | **Urutan:** Lipatan 1 Cover Warkat & Segel Lilin &rarr; Lipatan 2 Profil Kedua Mempelai (Kertas bermotif & polaroid brass paperclip) &rarr; Lipatan 3 Maklumat Pernikahan & Jadwal Akad/Resepsi &rarr; Album Carte Postale &rarr; Slip Kiriman Kado &rarr; Kartu Balasan Pos RSVP &rarr; Footer Pita Pos Udara. |
| 2 | `boardingpass` | **The Boarding Pass** | Aviation Navy `#14213D`, Gold `#E2B755`, Flight White `#FAF8F5` | **Urutan:** Tiket Boarding Pass First-Class &rarr; **Pita Marquee Jadwal Gate Bandara** &rarr; **Jadwal Flight Gate 01 & 02 (Event Details di depan)** &rarr; Paspor Ganda Resmi (Biometrik & Stempel Visa) &rarr; Reservasi Manifest Penumpang (RSVP) &rarr; Baggage Claim (Kado & Rekening) &rarr; Rekaman Foto Perjalanan (Gallery) &rarr; Footer Landing Selesai. |
| 3 | `newspaper` | **The Wedding Gazette** | Newsprint `#F4EFE6`, Printing Black `#111111`, White | **Urutan:** Kepala Koran & Tajuk Utama Berita &rarr; **Pita Breaking News Ticker Tape** &rarr; Artikel Utama Mempelai & Profil &rarr; **Arsip Foto Jurnalistik / Rotogravure Stills (Gallery di depan)** &rarr; Maklumat Acara & Jadwal Resmi &rarr; Kupon Gunting Telegram ✂ (RSVP) &rarr; Halaman Iklan Baris (Kado) &rarr; Footer Kolofon Percetakan. |
| 4 | `filmstrip` | **35mm Filmstrip Cinema** | Cine Noir `#0A0A0A`, Premiere Gold `#D4AF37`, Platinum | **Urutan:** Tiket Emas Cannes Premiere &rarr; **Klise Foto Stills Sinematik 35mm (Gallery di depan)** &rarr; **Pita Intertitle Perforasi Rol Film** &rarr; Daftar Pemeran Utama & Profil Bintang (Couple) &rarr; Jadwal Tayang Act I & Act II (Event) &rarr; Reservasi Kursi Red Carpet VIP (RSVP) &rarr; Dana Box Office (Kado) &rarr; Footer Roll End Credits. |

---

## Google Sheets CMS Integration Integrity

Semua komponen mempertahankan keterhubungan dinamis 100% dengan endpoint Google Apps Script:
- **`data.settings.weddingDate`** &rarr; Menghidupkan mesin hitung mundur (*countdown timer*) secara real-time.
- **`data.couple`** &rarr; Nama, panggilan, orang tua, kutipan, dan foto kedua mempelai.
- **`data.events`** &rarr; Daftar agenda (Akad & Resepsi) beserta tautan Google Maps.
- **`data.gallery`** &rarr; Galeri foto dokumentasi.
- **`data.gifts`** &rarr; Rekening bank transfer & alamat pengiriman kado fisik dengan fitur salin instan.
- **`data.wishes`** &rarr; Umpan pesan doa restu tamu yang terisi langsung secara otomatis.
- **RSVP Form** &rarr; Mengirim data langsung melalui HTTP POST (`mode: 'no-cors'`).
