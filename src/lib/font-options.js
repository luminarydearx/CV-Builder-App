// Daftar font yang bisa dipilih user untuk teks CV mereka. Sengaja dibatasi
// ke font yang tersedia luas di Windows/Mac/Linux (termasuk yang dipakai
// Chromium saat generate PDF di server) supaya pilihan font ini SELALU
// tampil sama persis antara preview dan hasil PDF -- tidak ada font custom
// yang butuh di-load dari internet.

export const FONT_OPTIONS = [
  { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { label: "Georgia", value: "Georgia, 'Times New Roman', serif" },
  { label: "Garamond", value: "Garamond, 'Times New Roman', serif" },
  { label: "Cambria", value: "Cambria, Georgia, serif" },
  { label: "Book Antiqua", value: "'Book Antiqua', Palatino, serif" },
  { label: "Arial", value: "Arial, Helvetica, sans-serif" },
  { label: "Helvetica", value: "Helvetica, Arial, sans-serif" },
  { label: "Verdana", value: "Verdana, Geneva, sans-serif" },
  { label: "Tahoma", value: "Tahoma, Verdana, sans-serif" },
  { label: "Trebuchet MS", value: "'Trebuchet MS', Helvetica, sans-serif" },
  { label: "Calibri", value: "Calibri, Candara, sans-serif" },
  { label: "Courier New", value: "'Courier New', Courier, monospace" },
];

export const DEFAULT_FONT_VALUE = FONT_OPTIONS[0].value;

export const fontLabelFromValue = (value) =>
  FONT_OPTIONS.find((f) => f.value === value)?.label || "Times New Roman";
