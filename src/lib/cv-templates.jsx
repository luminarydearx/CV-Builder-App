/*
 * Helper bersama yang dipakai oleh SEMUA template CV (file engine ada di
 * src/lib/template-engines.jsx). Dipisah di sini supaya bisa diimport dari
 * DUA tempat tanpa duplikasi:
 *   1. Client: LivePreview.jsx, untuk preview interaktif di Builder/Preview.
 *   2. Server: app/api/generate-pdf/route.js, lewat ReactDOMServer.
 *
 * Karena PREVIEW dan PDF memanggil komponen yang PERSIS SAMA, hasil render
 * keduanya dijamin identik -- inilah dasar dari sinkronisasi preview <-> PDF.
 */

import { Folder } from "lucide-react";
import { SECTION_ICON_MAP } from "@/lib/section-icons";

export const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// ─────────────────────────────────────────────────────────────────────────
// SISTEM EDITOR VISUAL (hitbox): override per-elemen + elemen bebas
//
// `data.elementOverrides` di-scope per template (key = data.selectedTemplate)
// supaya nudge posisi di satu template tidak "nyasar" ke template lain.
// Karena setiap komponen template SUDAH tahu `data` (dan karenanya tahu
// `data.selectedTemplate` -- yaitu dirinya sendiri), kita tidak perlu
// mengoper templateId terpisah ke tiap pemanggilan helper.
// ─────────────────────────────────────────────────────────────────────────
export const getOverride = (data, elementId) => {
  const templateId = data?.selectedTemplate;
  if (!templateId) return null;
  return data?.elementOverrides?.[templateId]?.[elementId] || null;
};

const overrideToStyle = (ov) => {
  if (!ov) return {};
  const style = {};
  if (ov.dx || ov.dy) {
    style.position = "relative";
    style.transform = `translate(${ov.dx || 0}px, ${ov.dy || 0}px)`;
  }
  if (ov.color) style.color = ov.color;
  if (ov.hidden) style.display = "none";
  return style;
};

// Dipakai untuk membungkus teks bawaan template (nama, jabatan, bio, dst)
// agar bisa di-nudge posisi dan diganti warnanya lewat editor visual.
// `data-edit-id` adalah "kait" yang dicari modal editor untuk menggambar
// hitbox tepat di atas elemen ini, lokasi mana pun elemen ini berada di
// dalam struktur HTML template (lihat ElementEditModal.jsx).
export const EditableText = ({ data, id, as: Tag = "span", style = {}, children }) => {
  const ov = getOverride(data, id);
  return (
    <Tag data-edit-id={id} style={{ ...style, ...overrideToStyle(ov) }}>
      {children}
    </Tag>
  );
};

export const PhotoOrInitial = ({ photo, name, size = 80, bgFrom = "#6366f1", bgTo = "#8b5cf6", border = "none", shadow = "none", radius = "50%", data, elementId = "photo" }) => {
  const ov = data ? getOverride(data, elementId) : null;
  return (
    <div data-edit-id={data ? elementId : undefined} style={{ width: size, height: size, borderRadius: radius, overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: photo ? undefined : `linear-gradient(135deg,${bgFrom},${bgTo})`, border, boxShadow: shadow, ...overrideToStyle(ov) }}>
      {photo ? <img src={photo} alt={name || "foto"} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ color: "white", fontWeight: 800, fontSize: size * 0.32, letterSpacing: "-1px" }}>{getInitials(name)}</span>}
    </div>
  );
};

export const SectionTitle = ({ children, color = "#64748b", style = {} }) => (
  <h2 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color, margin: "0 0 8px", ...style }}>{children}</h2>
);

export const ContactRow = ({ items, color = "#475569", fontSize = 11 }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 16px", fontSize, color }}>
    {items.location && <span>📍 {items.location}</span>}
    {items.email && <span>✉ {items.email}</span>}
    {items.phone && <span>📞 {items.phone}</span>}
    {items.website && <span>🌐 {items.website}</span>}
    {items.linkedin && <span>in {items.linkedin}</span>}
    {items.github && <span>⌥ {items.github}</span>}
  </div>
);

// Dipakai semua template untuk merender section custom buatan user sendiri
// (mis. "Sertifikasi", "Bahasa"). Satu komponen generik dipakai di semua
// template supaya tidak ada implementasi ganda yang bisa berbeda hasil
// antara preview dan PDF.
export const CustomSectionsBlock = ({ sections, accentColor = "#64748b", textColor = "#64748b", titleColor, dark = false }) => {
  if (!sections || sections.length === 0) return null;
  return sections.map((section) => {
    const IconComp = SECTION_ICON_MAP[section.icon] || Folder;
    return (
      <div key={section.id} style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <IconComp size={11} color={titleColor || accentColor} />
          <h2 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: titleColor || accentColor, margin: 0 }}>{section.title}</h2>
        </div>
        {section.items.map((item) => (
          <div key={item.id} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ fontSize: 13, color: dark ? "#fff" : "#1e293b" }}>{item.heading}</strong>
              {item.period && <span style={{ fontSize: 11, color: accentColor }}>{item.period}</span>}
            </div>
            {item.subheading && <div style={{ fontSize: 12, color: accentColor }}>{item.subheading}</div>}
            {item.description && <p style={{ fontSize: 11, color: textColor, lineHeight: 1.6, margin: "2px 0 0", textAlign: "justify" }}>{item.description}</p>}
          </div>
        ))}
      </div>
    );
  });
};

// Layer elemen BEBAS (teks/gambar) yang ditambahkan user sendiri lewat
// editor visual. SATU komponen ini dipanggil di akhir SETIAP template
// (sama seperti CustomSectionsBlock), jadi "tambah teks/gambar di mana
// saja" otomatis tersedia di SEMUA template -- termasuk yang baru
// ditambahkan nanti -- tanpa perlu instrumentasi khusus per template.
// Posisi absolut terhadap kanvas RESUME_WIDTH x RESUME_MIN_HEIGHT supaya
// preview dan PDF selalu menempatkannya di koordinat yang identik.
export const FreeElementsLayer = ({ elements }) => {
  if (!elements || elements.length === 0) return null;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {elements.map((el) => {
        const common = {
          position: "absolute",
          left: el.x,
          top: el.y,
          width: el.width || "auto",
          height: el.type === "image" ? el.height || "auto" : "auto",
          transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
          zIndex: 5,
        };
        if (el.type === "image" && el.src) {
          return (
            <img
              key={el.id}
              data-edit-id={el.id}
              data-free-element="true"
              src={el.src}
              alt=""
              style={{ ...common, objectFit: "cover", borderRadius: el.borderRadius || 0 }}
            />
          );
        }
        return (
          <div
            key={el.id}
            data-edit-id={el.id}
            data-free-element="true"
            style={{
              ...common,
              color: el.color || "#1e293b",
              fontSize: el.fontSize || 14,
              fontWeight: el.fontWeight || 400,
              whiteSpace: "pre-wrap",
              lineHeight: 1.4,
            }}
          >
            {el.content || ""}
          </div>
        );
      })}
    </div>
  );
};

export const RESUME_WIDTH = 794; // A4 @ 96dpi, dipakai juga sebagai lebar cetak PDF
export const RESUME_MIN_HEIGHT = 1123; // A4 @ 96dpi
