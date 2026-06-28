# PortoInstant — CV Builder (Next.js 16)

CV Builder untuk fresh graduate Indonesia — isi form, pilih dari 17 template, sesuaikan warna & font sendiri, lalu download sebagai PDF. Generator PDF berbasis Puppeteer (Chromium asli) sehingga preview dan hasil PDF dijamin identik.

## Cara menjalankan di komputer lokal

Butuh **Node.js 20.9 atau lebih baru**.

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

> **Catatan instalasi pertama kali:** `npm install` akan otomatis mendownload Chromium (lewat package `puppeteer`) untuk generate PDF di server. Butuh koneksi internet, sekitar 200-300MB, hanya sekali di awal.

Build production:

```bash
npm run build
npm start
```

## Fitur

### 17 Template, Struktur Beda-Beda
10 template asli + 7 template baru (Sidebar Eksekutif, Banner Foto, Clean ATS, Bold Modern, Pastel Band, Garis Minimalis, Eksekutif Padat) terinspirasi desain CV profesional. Setiap template punya struktur layout yang benar-benar berbeda — bukan sekadar beda warna.

### Sesuaikan Warna (BARU)
Daripada puluhan "template" yang sebenarnya cuma beda warna, sekarang ada satu fitur **"Sesuaikan Warna"** di Builder yang berlaku untuk **template apa pun**: 10 preset palet siap pakai, atau atur manual 6 slot warna (Warna Utama, Sekunder, Latar, Kotak/Kartu, Teks, Teks Pudar). Berlaku konsisten antara preview dan PDF.

### Thumbnail Nyata di Halaman Templates (BARU)
Thumbnail di halaman pemilihan template sekarang me-render **komponen template asli** dengan data contoh (nama "Benjamin Carter" dkk) — bukan lagi skeleton/kotak abu-abu. Jadi kamu lihat persis seperti apa hasilnya, mirip cara Canva menampilkan preview template.

### Sinkronisasi Preview ↔ PDF
Semua template di-render dari **satu modul kode yang sama** (`src/lib/template-engines.jsx`), dipakai baik oleh preview di browser maupun generator PDF di server (`src/app/api/generate-pdf/route.js`) lewat Puppeteer + Chromium asli. Tidak ada implementasi render kedua yang terpisah.

### Font Picker
Times New Roman, Georgia, Garamond, Cambria, Arial, Calibri, Courier New, dan lainnya. Default mengikuti font asli tiap template; begitu dipilih, berlaku ke semua template secara konsisten.

### Justify Text
Semua paragraf (bio, deskripsi pengalaman, deskripsi proyek) dirender rata kiri-kanan seperti dokumen Word.

### Crop & Rotate Foto
Modal editor saat upload foto: geser (pan), zoom, dan rotasi bebas derajat. Hasil di-"bake" jadi satu gambar lewat Canvas API sebelum disimpan.

### Custom Section
Tambah section CV sendiri (Sertifikasi, Bahasa, Volunteer, dll), masing-masing dapat icon, bisa diisi banyak item. Tampil di semua template, preview maupun PDF.

## Struktur proyek

```
src/
├── app/
│   ├── layout.jsx
│   ├── page.jsx
│   ├── builder/page.jsx            # Form + font picker + sesuaikan warna + custom sections + crop foto
│   ├── templates/page.jsx          # Picker 17 template dengan thumbnail nyata
│   ├── preview/page.jsx
│   ├── about/page.jsx
│   ├── not-found.jsx
│   └── api/generate-pdf/route.js   # Generator PDF (Puppeteer)
├── components/
│   ├── layout/Navbar.jsx
│   ├── preview/LivePreview.jsx
│   ├── preview/ResumeStage.jsx     # Scale-to-fit A4 stage (preview utama)
│   ├── preview/TemplateThumbnail.jsx  # Scale-to-fit untuk thumbnail picker
│   ├── ui/DraftManager.jsx
│   ├── ui/PhotoCropModal.jsx
│   ├── PageTransition.jsx
│   └── ToastProvider.jsx
├── context/PortfolioContext.jsx    # State: autosave, draft, custom sections, customColors
└── lib/
    ├── cv-templates.jsx            # Helper bersama (PhotoOrInitial, SectionTitle, dll)
    ├── template-engines.jsx        # 17 layout engine + default theme tiap template
    ├── theme-colors.js             # Sistem resolveTheme() + 10 preset warna
    ├── all-templates.jsx           # templateMap final (dipakai preview & PDF)
    ├── templates-meta.jsx          # Metadata untuk halaman Templates
    ├── demo-data.js                # Data contoh untuk thumbnail
    ├── font-options.js
    └── section-icons.js
```

## Catatan teknis

- **Arsitektur warna**: setiap template punya `defaultTheme` (7 slot: accent, accent2, bg, surface, text, muted, onAccent). `resolveTheme()` menggabungkan default ini dengan `data.customColors` (jika user sudah kustomisasi). Karena semua template memakai sistem yang sama, satu fitur "Sesuaikan Warna" otomatis berlaku ke semua 17 template tanpa perlu logic per-template.
- Data CV disimpan di `localStorage` browser. Ada jeda sangat singkat (level milidetik) sebelum data tersimpan dimuat saat halaman pertama render — perilaku standar SSR + localStorage.
- Foto profil disimpan sebagai base64 di `data.photo`, sudah dalam bentuk final (sudah di-crop/rotate) sebelum disimpan.
