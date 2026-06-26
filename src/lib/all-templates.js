import { templateMap as baseTemplateMap } from "@/lib/cv-templates";
import { extraTemplateMap } from "@/lib/cv-templates-extra";

// Satu-satunya tempat templateMap final dirakit -- dipakai bersama oleh
// LivePreview.jsx (client) dan app/api/generate-pdf/route.js (server),
// supaya preview dan PDF selalu memilih komponen template yang sama persis
// untuk template apa pun (baik dari 10 original maupun 40 tambahan).
export const allTemplateMap = {
  ...baseTemplateMap,
  ...extraTemplateMap,
};
