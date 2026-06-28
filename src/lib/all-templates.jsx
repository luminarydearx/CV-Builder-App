import { templateRegistry } from "@/lib/template-engines";
import { resolveTheme } from "@/lib/theme-colors";

// Satu-satunya tempat templateMap final dirakit -- dipakai bersama oleh
// LivePreview.jsx (client) dan app/api/generate-pdf/route.js (server).
// Setiap entry membungkus Component dengan resolveTheme() supaya warna
// custom user (data.customColors) otomatis diterapkan, baik di preview
// maupun PDF, tanpa logic terpisah di kedua tempat.
export const allTemplateMap = Object.fromEntries(
  Object.entries(templateRegistry).map(([id, { Component, theme }]) => [
    id,
    function TemplateWithTheme({ data }) {
      return <Component data={data} theme={resolveTheme(data, theme)} />;
    },
  ])
);
