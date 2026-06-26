# PortoInstant — CV Builder (Next.js 16)

CV Builder untuk fresh graduate Indonesia — isi form, pilih dari 50 template, atur font & foto, lalu download sebagai PDF. Dibangun di atas Next.js 16 dengan generator PDF berbasis Puppeteer (Chromium asli) sehingga preview dan hasil PDF dijamin identik.

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

### 50 Template CV
10 template asli + 40 template baru, dibangun dari 10 "layout engine" (struktur layout) yang masing-masing punya 4 varian warna. Lebih dari separuh template support foto profil. Semua template otomatis mendukung font custom, justify text, dan custom section.

### Sinkronisasi Preview ↔ PDF
Semua 50 template di-render dari **satu modul kode yang sama** (`src/lib/cv-templates.jsx` + `src/lib/cv-templates-extra.jsx`), dipakai baik oleh preview di browser maupun generator PDF di server (`src/app/api/generate-pdf/route.js`) lewat Puppeteer + Chromium asli. Tidak ada implementasi render kedua yang terpisah, jadi preview dan PDF tidak akan pernah berbeda.

### Font Picker
Dropdown di Builder untuk memilih font teks CV — Times New Roman, Georgia, Garamond, Cambria, Arial, Calibri, Courier New, dan beberapa lainnya. Defaultnya mengikuti desain asli tiap template (supaya template seperti Neon/Retro tidak kehilangan identitas monospace-nya); begitu font dipilih, langsung berlaku ke semua template secara konsisten antara preview dan PDF.

### Justify Text
Semua paragraf (bio, deskripsi pengalaman, deskripsi proyek) di seluruh 50 template dirender dengan `text-align: justify` — rata kiri-kanan seperti dokumen Word.

### Crop & Rotate Foto
Saat upload foto, muncul modal editor: geser (pan) untuk atur posisi, slider zoom, dan slider rotasi bebas derajat (-180° sampai 180°). Hasil akhirnya di-"bake" jadi satu gambar lewat Canvas API sebelum disimpan — jadi template tidak perlu tahu apa-apa soal crop/rotate, cukup terima gambar jadi seperti biasa.

### Custom Section
Di Builder ada section "Section Tambahan": tambah section CV sendiri (misal Sertifikasi, Bahasa, Volunteer), masing-masing dapat icon (acak otomatis, bisa diganti manual), dan bisa diisi banyak item (judul, sub-judul, periode, deskripsi). Custom section ikut tampil di semua 50 template, baik di preview maupun PDF.

## Struktur proyek

```
src/
├── app/
│   ├── layout.jsx                  # Root layout (font, background, provider)
│   ├── page.jsx                    # Home
│   ├── builder/page.jsx            # Form builder + font picker + custom sections + crop foto
│   ├── templates/page.jsx          # Picker 50 template
│   ├── preview/page.jsx            # Preview + download PDF
│   ├── about/page.jsx
│   ├── not-found.jsx
│   └── api/generate-pdf/route.js   # Generator PDF (Puppeteer)
├── components/
│   ├── layout/Navbar.jsx
│   ├── preview/LivePreview.jsx     # Wrapper client untuk preview
│   ├── preview/ResumeStage.jsx     # Scale-to-fit A4 stage
│   ├── ui/DraftManager.jsx
│   ├── ui/PhotoCropModal.jsx       # Modal crop & rotate foto
│   ├── PageTransition.jsx
│   └── ToastProvider.jsx
├── context/PortfolioContext.jsx    # State management (autosave, draft, custom sections)
└── lib/
    ├── cv-templates.jsx            # 10 template original + helper bersama
    ├── cv-templates-extra.jsx      # 10 layout engine + 40 template tema baru
    ├── all-templates.js            # Gabungan templateMap final (dipakai preview & PDF)
    ├── templates-meta.jsx          # Metadata + thumbnail untuk halaman Templates
    ├── font-options.js             # Daftar font yang bisa dipilih
    ├── section-icons.js            # Daftar icon untuk custom section
    └── fonts.js                    # next/font/google setup
```

## Catatan teknis

- Data CV disimpan di `localStorage` browser (autosave + draft manager). Ada jeda sangat singkat (level milidetik) sebelum data tersimpan dimuat saat halaman pertama kali render — ini perilaku standar SSR + localStorage, tidak memengaruhi fungsionalitas.
- 40 template baru memakai pendekatan "layout engine" (komponen struktur yang reusable, di-theme ulang dengan warna berbeda) dibanding 40 implementasi unik terpisah — supaya satu perbaikan bug otomatis berlaku ke semua varian dalam satu family, dan supaya sinkronisasi preview/PDF tetap terjamin dari satu sumber kode.
- Foto profil disimpan sebagai base64 di field `data.photo`, sudah dalam bentuk final (sudah di-crop/rotate) sebelum disimpan — template tidak melakukan crop apa pun sendiri.
