import { templateRegistry } from "@/lib/template-engines";

// Metadata ringan untuk halaman Templates. Thumbnail-nya TIDAK lagi
// berupa skeleton/mockup buatan tangan -- sekarang dirender langsung dari
// komponen template asli + data contoh (lihat TemplateThumbnail.jsx),
// supaya yang dilihat user di halaman ini selalu 100% akurat seperti
// hasil jadi, mirip cara Canva menampilkan preview template.

const META = {
  minimal: { tag: "Klasik & Bersih", desc: "Desain hitam-putih yang bersih dan profesional. Cocok untuk posisi korporat, keuangan, dan hukum.", accent: "from-slate-500 to-slate-700" },
  modern: { tag: "Dark & Tech", desc: "Desain gelap bergaya tech modern dengan aksen biru. Ideal untuk developer, data scientist, dan engineer.", accent: "from-blue-600 to-indigo-700" },
  creative: { tag: "Colorful & Bold", desc: "Desain penuh warna dengan sentuhan kreatif. Sempurna untuk desainer, ilustrator, dan creative professional.", accent: "from-pink-500 to-purple-600" },
  professional: { tag: "Corporate & Formal", desc: "Desain dua kolom elegan dengan foto profil. Ideal untuk posisi manajerial, konsultan, dan profesional senior.", accent: "from-blue-800 to-blue-600" },
  elegant: { tag: "Gold & Luxury", desc: "Desain mewah dengan aksen emas dan tipografi premium. Cocok untuk eksekutif, konsultan, dan brand personal premium.", accent: "from-yellow-600 to-amber-500" },
  neon: { tag: "Futuristic", desc: "Desain futuristik neon hijau & cyan di atas hitam pekat. Untuk developer, gamer, dan tech enthusiast.", accent: "from-green-400 to-cyan-400" },
  sunset: { tag: "Warm & Vibrant", desc: "Desain hangat gradien sunset oranye-ungu. Cocok untuk marketer, content creator, dan HR professional.", accent: "from-orange-500 to-rose-500" },
  forest: { tag: "Natural & Calm", desc: "Desain natural palet hijau organik yang menenangkan. Ideal untuk environmental, NGO, educator, dan wellness.", accent: "from-green-700 to-emerald-600" },
  aurora: { tag: "Dreamy & Premium", desc: "Desain aurora borealis dengan gradien ungu-biru yang magis. Untuk UI/UX designer, artist, dan dreamer.", accent: "from-violet-600 to-cyan-500" },
  retro: { tag: "Vintage & Unique", desc: "Desain retro terinspirasi koran vintage dan mesin tik. Unik dan memorable untuk penulis, journalist, dan akademisi.", accent: "from-yellow-700 to-amber-800" },
  iconsidebar: { tag: "Eksekutif & Rapi", desc: "Sidebar gelap dengan foto bundar dan baris kontak ber-icon. Cocok untuk manajer, konsultan, dan posisi senior.", accent: "from-amber-600 to-slate-700" },
  photobanner: { tag: "Foto Banner", desc: "Foto besar jadi banner di bagian atas dengan nama overlay. Untuk siapa pun yang ingin kesan personal & profesional.", accent: "from-amber-500 to-slate-800" },
  cleanats: { tag: "ATS-Friendly", desc: "Desain super bersih tanpa kotak/warna mencolok, ramah sistem ATS. Pilihan aman untuk lamaran kerja formal.", accent: "from-slate-600 to-slate-800" },
  boldphototop: { tag: "Bold & Modern", desc: "Nama besar dan tebal dengan foto di pojok, gaya modern yang berani. Untuk profesional muda yang percaya diri.", accent: "from-red-600 to-slate-800" },
  pastelband: { tag: "Pastel & Ceria", desc: "Header band warna pastel lembut dengan layout dua kolom. Cocok untuk HR, marketing, dan posisi kreatif-korporat.", accent: "from-pink-400 to-blue-400" },
  linedivider: { tag: "Minimalis Elegan", desc: "Tanpa kotak atau warna mencolok, hanya garis tipis sebagai pembatas. Tipografi serif yang elegan dan lapang.", accent: "from-stone-500 to-stone-700" },
  compactexecutive: { tag: "Padat & Profesional", desc: "Layout dua kolom padat untuk profesional senior dengan riwayat kerja panjang. Ringkas tapi tetap mudah dibaca.", accent: "from-slate-700 to-blue-900" },
};

export const templates = Object.entries(templateRegistry).map(([id, { name, hasPhoto }]) => ({
  id,
  name,
  hasPhoto,
  ...META[id],
}));
