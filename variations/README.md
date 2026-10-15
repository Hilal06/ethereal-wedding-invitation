# Arsip Variasi Desain Ethereal Wedding

Folder ini menyimpan dokumentasi lengkap, struktur komponen, urutan seksi (*layout sequence*), dan kode CSS dari variasi desain alternatif yang pernah dibuat.

Jika di kemudian hari ingin **mengganti total desain** atau menerapkan salah satu dari variasi ini, seluruh kode dan aset pendukung siap digunakan kembali secara instan.

---

## Daftar Variasi yang Tersimpan:

1. **[The Boarding Pass (Aviation / Flight Theme)](./boardingpass.md)**
   - **Konsep:** Tiket penerbangan internasional kelas satu (*First Class*), rute non-stop `CGK -> LOVE`, paspor ganda resmi kedua mempelai dengan stempel visa imigrasi, jadwal gerbang (*Gate 01 & 02*) di awal, manifest penumpang (RSVP), dan klaim bagasi (*luggage tag*).
   - **Palet:** Aviation Navy `#14213D`, Gold `#E2B755`, Flight White `#FAF8F5`.

2. **[The Wedding Gazette (Broadsheet Newspaper)](./newspaper.md)**
   - **Konsep:** Format surat kabar broadsheet klasik 1800-an / koran harian, tajuk berita utama (*Headline*), pita breaking news, liputan biografi mempelai, arsip foto jurnalistik rotogravure di bagian depan, kupon telegram potong gunting putus-putus ✂ (RSVP), iklan baris (*classifieds*), dan kolofon percetakan.
   - **Palet:** Newsprint `#F4EFE6`, Printing Black `#111111`, Accent Crimson `#8C2A3E`.

3. **[35mm Filmstrip Cinema (Cannes Premiere)](./filmstrip.md)**
   - **Konsep:** Penayangan perdana film layar lebar / tiket emas premiere (*Admit Two*), klise pita film seluloid 35mm berlubang sprocket, cuplikan foto adegan (*production stills*) di awal sebelum daftar pemain, jajaran pemeran utama (*Leading Man & Leading Lady*), jadwal tayang Act I & Act II, dan *roll end credits* sutradara.
   - **Palet:** Cine Noir `#0A0A0A`, Premiere Gold `#D4AF37`, Platinum `#E0E0E0`.

4. **[Variasi Lainnya (Museum, Japandi, Botanical, Bento)](./other_archived_variants.md)**
   - Dokumentasi konsep, palet warna, dan filosofi tata letak untuk Museum Vernissage, Japandi Wabi-Sabi, Atelier Botanical, dan Swiss Bento Grid.

---

## Cara Menerapkan Kembali Variasi ke Desain Aktif:
1. Buka file variasi yang diinginkan (misal `variations/boardingpass.md`).
2. Salin kode CSS tematik yang tertera ke dalam `src/index.css`.
3. Terapkan kode komponen yang bersangkutan ke dalam file `src/components/` (`Hero.tsx`, `Couple.tsx`, `EventDetails.tsx`, dll.).
4. Sesuaikan urutan komponen pada `src/App.tsx` sesuai *Layout Sequence* yang tercantum pada file variasi.
