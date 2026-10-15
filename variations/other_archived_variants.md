# Variasi Desain Lainnya yang Pernah Dibuat

Dokumen ini mencatat konsep, palet, dan token desain dari variasi-variasi lain yang pernah dieksplorasi dalam proyek ini.

---

## 1. Museum Vernissage
- **Konsep:** Pameran galeri seni rupa / pembukaan vernissage privat.
- **Palet:** Charcoal Velvet `#191B1F`, Gilded Gold `#D4AF37`, Warm White `#E8E5DF`.
- **Elemen Unik:** Bingkai barok gilded gold berukir, plakat kurator kuningan (*brass curator plaque*), pemisah ruangan galeri (*Salon Room I & II*), dan catatan kurator di footer.
- **CSS Utilitas:**
```css
.museum-texture {
  background-color: #191B1F;
  background-image: radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.06) 0%, transparent 70%);
}
.museum-gilt-frame {
  background: #25282F;
  border: 4px solid #D4AF37;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), inset 0 0 15px rgba(212, 175, 55, 0.2);
}
.brass-curator-plaque {
  background: linear-gradient(180deg, #E6C687 0%, #C49F58 50%, #B38C45 100%);
  border: 1px solid #735722;
  color: #261D0C;
  font-family: 'Italiana', serif;
}
```

---

## 2. Japandi Wabi-Sabi
- **Konsep:** Kesederhanaan zen Jepang & kenyamanan hygge Skandinavia.
- **Palet:** Muted Sage Green `#5A6B54`, Warm Oatmeal `#F4EFEA`, Soft Paper `#FAF7F2`, Charcoal Stone `#2C2A29`.
- **Elemen Unik:** Pulau batu sungai asimetris (*pebble cards* `rounded-[2.5rem]`), lingkaran Ensō zen, tenunan kain linen alami, ruang bernapas luas (*generous negative space*).

---

## 3. Atelier Botanical
- **Konsep:** Herbarium botani mewah & koleksi flora klasik.
- **Palet:** Herbarium Ivory `#FBF9F5`, Hunter Green `#1E3A2F`, Antique Foil Gold `#C8A97E`.
- **Elemen Unik:** Label herba spesimen ilmiah (*Specimen No. 2026*), sketsa dedaunan, kartu berbingkai emas halus.

---

## 4. Swiss Bento Grid
- **Konsep:** Desain Bauhaus modernis & tata letak modular grid bento.
- **Palet:** Obsidian Black `#0E0F12`, Neon Terracotta `#E26D5C`, Pure White `#F4F4F6`.
- **Elemen Unik:** Kotak bento modular asimetris (`rounded-3xl`), tipografi sans-serif teknikal Bauhaus, status metadata sistem live feed.
