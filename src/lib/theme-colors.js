// Sistem warna terpadu yang dipakai SEMUA template CV.
//
// Setiap template punya "default theme" -- 7 slot warna dasar yang
// dipakai konsisten di semua layout:
//   accent    - warna utama/brand: judul section, border, badge, link
//   accent2   - warna sekunder: dipakai untuk gradient/dual-tone
//   bg        - warna latar utama halaman
//   surface   - warna kotak/kartu di atas bg (card, sidebar box, dll)
//   text      - warna teks utama
//   muted     - warna teks sekunder/pudar
//   onAccent  - warna teks yang berada DI ATAS warna accent (untuk kontras)
//
// User bisa override sebagian/semua slot ini lewat data.customColors,
// baik lewat preset siap pakai atau color picker manual per slot.
// resolveTheme() men-merge default + override -- dipakai oleh semua
// engine template, jadi satu mekanisme ini berlaku ke SEMUA template
// sekaligus, baik di preview maupun PDF (karena sama-sama baca dari
// `data` yang sama).

export function resolveTheme(data, defaultTheme) {
  const override = data?.customColors;
  if (!override) return defaultTheme;
  // hanya override key yang memang diisi (non-empty), sisanya pakai default
  const merged = { ...defaultTheme };
  for (const key of Object.keys(override)) {
    if (override[key]) merged[key] = override[key];
  }
  return merged;
}

export const COLOR_SLOT_LABELS = {
  accent: "Warna Utama",
  accent2: "Warna Sekunder",
  bg: "Warna Latar",
  surface: "Warna Kotak/Kartu",
  text: "Warna Teks",
  muted: "Warna Teks Pudar",
};

export const COLOR_PRESETS = [
  { id: "navy-gold", label: "Navy & Gold", colors: { accent: "#b8860b", accent2: "#1e3a5f", bg: "#ffffff", surface: "#f8fafc", text: "#1e293b", muted: "#64748b", onAccent: "#ffffff" } },
  { id: "emerald", label: "Emerald", colors: { accent: "#059669", accent2: "#047857", bg: "#ffffff", surface: "#f0fdf9", text: "#022c22", muted: "#475569", onAccent: "#ffffff" } },
  { id: "crimson", label: "Crimson", colors: { accent: "#b91c1c", accent2: "#7f1d1d", bg: "#ffffff", surface: "#fff5f5", text: "#1f1315", muted: "#78716c", onAccent: "#ffffff" } },
  { id: "ocean", label: "Ocean Blue", colors: { accent: "#0369a1", accent2: "#0891b2", bg: "#ffffff", surface: "#f0f9ff", text: "#0c1f2e", muted: "#475569", onAccent: "#ffffff" } },
  { id: "violet", label: "Violet", colors: { accent: "#7c3aed", accent2: "#a855f7", bg: "#ffffff", surface: "#faf5ff", text: "#1e1033", muted: "#64748b", onAccent: "#ffffff" } },
  { id: "graphite", label: "Graphite Dark", colors: { accent: "#a1a1aa", accent2: "#71717a", bg: "#18181b", surface: "rgba(255,255,255,0.05)", text: "#e4e4e7", muted: "#a1a1aa", onAccent: "#18181b" } },
  { id: "midnight", label: "Midnight Purple", colors: { accent: "#a855f7", accent2: "#6366f1", bg: "#0f0f1a", surface: "rgba(168,85,247,0.1)", text: "#e2e8f0", muted: "#94a3b8", onAccent: "#ffffff" } },
  { id: "terracotta", label: "Terracotta", colors: { accent: "#c2410c", accent2: "#9a3412", bg: "#fff7ed", surface: "#ffffff", text: "#431407", muted: "#78716c", onAccent: "#ffffff" } },
  { id: "rosegold", label: "Rose Gold", colors: { accent: "#e8a0bc", accent2: "#be185d", bg: "#fff1f5", surface: "#ffffff", text: "#3f1124", muted: "#78716c", onAccent: "#ffffff" } },
  { id: "monochrome", label: "Monokrom", colors: { accent: "#27272a", accent2: "#52525b", bg: "#ffffff", surface: "#fafafa", text: "#18181b", muted: "#71717a", onAccent: "#ffffff" } },
];
