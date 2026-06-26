/*
 * Komponen template CV — murni presentational, tanpa hook, tanpa state.
 * Modul ini sengaja dipisah dari LivePreview (client) agar bisa di-import
 * dari DUA tempat:
 *   1. Client: LivePreview.jsx, untuk preview interaktif di Builder/Preview page.
 *   2. Server: app/api/generate-pdf/route.js, lewat ReactDOMServer.renderToStaticMarkup.
 *
 * Karena PREVIEW dan PDF memanggil PERSIS komponen yang sama (bukan dua
 * implementasi terpisah yang "mirip"), hasil render keduanya dijamin identik
 * -- inilah perbaikan inti dari bug "preview tidak sinkron dengan PDF".
 *
 * Styling di bawah ini disalin verbatim dari LivePreview.jsx versi React/Vite,
 * tidak ada logic yang diubah.
 */

import { Folder } from "lucide-react";
import { SECTION_ICON_MAP } from "@/lib/section-icons";

export const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const PhotoOrInitial = ({ photo, name, size = 80, bgFrom = "#6366f1", bgTo = "#8b5cf6", border = "none", shadow = "none" }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: photo ? undefined : `linear-gradient(135deg,${bgFrom},${bgTo})`, border, boxShadow: shadow }}>
    {photo ? <img src={photo} alt={name || "foto"} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ color: "white", fontWeight: 800, fontSize: size * 0.32, letterSpacing: "-1px" }}>{getInitials(name)}</span>}
  </div>
);

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
// 50 template supaya tidak ada implementasi ganda yang bisa berbeda hasil
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

/* ─────────────────────────── MINIMAL ─────────────────────────── */
const MinimalTemplate = ({ data }) => (
  <div style={{ fontFamily: data.fontFamily || "'Georgia',serif", background: "#fff", color: "#1e293b", padding: "40px 44px", height: "100%" }}>
    <div style={{ borderBottom: "2px solid #1e293b", paddingBottom: 16, marginBottom: 20 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.5px" }}>{data.name || "Nama Lengkap"}</h1>
      <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 10px", fontStyle: "italic" }}>{data.title || "Jabatan / Role"}</p>
      <ContactRow items={data} />
    </div>
    {data.bio && <div style={{ marginBottom: 20 }}><SectionTitle color="#64748b">Profil</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.7, color: "#334155", margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
    {data.skills.length > 0 && <div style={{ marginBottom: 20 }}><SectionTitle color="#64748b">Keahlian</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "3px 10px", border: "1px solid #cbd5e1", borderRadius: 4, color: "#334155" }}>{s}</span>)}</div></div>}
    {data.experience.length > 0 && <div style={{ marginBottom: 20 }}><SectionTitle color="#64748b">Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><strong style={{ fontSize: 13 }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 11, color: "#64748b" }}>{exp.period}</span></div><div style={{ fontSize: 12, color: "#475569", marginBottom: 2 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
    {data.education.length > 0 && <div style={{ marginBottom: 20 }}><SectionTitle color="#64748b">Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13 }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 11, color: "#64748b" }}>{edu.period}</span></div><div style={{ fontSize: 12, color: "#475569" }}>{edu.school}{edu.gpa && ` · IPK: ${edu.gpa}`}</div></div>))}</div>}
    {data.projects.length > 0 && <div style={{ marginBottom: 20 }}><SectionTitle color="#64748b">Proyek</SectionTitle>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13 }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: "#3b82f6" }}>↗ Link</a>}</div>{p.description && <p style={{ fontSize: 11, color: "#64748b", margin: "2px 0", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 10, color: "#94a3b8", margin: 0 }}>{p.tech}</p>}</div>))}</div>}
    <CustomSectionsBlock sections={data.customSections} accentColor="#64748b" textColor="#64748b" titleColor="#64748b" />
  </div>
);

/* ─────────────────────────── MODERN ─────────────────────────── */
const ModernTemplate = ({ data }) => (
  <div style={{ fontFamily: data.fontFamily || "'Inter','Segoe UI',sans-serif", background: "#0f172a", color: "#e2e8f0", height: "100%" }}>
    <div style={{ background: "linear-gradient(135deg,#1e3a8a,#312e81)", padding: "32px 40px 28px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", color: "#fff", letterSpacing: "-0.5px" }}>{data.name || "Nama Lengkap"}</h1>
      <p style={{ fontSize: 14, color: "#93c5fd", margin: "0 0 14px", fontWeight: 500 }}>{data.title || "Jabatan / Role"}</p>
      <ContactRow items={data} color="#bfdbfe" fontSize={11} />
    </div>
    <div style={{ padding: "28px 40px" }}>
      {data.bio && <div style={{ marginBottom: 24 }}><SectionTitle color="#60a5fa">Tentang Saya</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.8, color: "#94a3b8", margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
      {data.skills.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color="#60a5fa">Tech Stack</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", color: "#93c5fd" }}>{s}</span>)}</div></div>}
      {data.experience.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color="#60a5fa">Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 16, background: "rgba(30,58,138,0.15)", borderRadius: 8, padding: 12, border: "1px solid rgba(30,58,138,0.3)" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><strong style={{ fontSize: 13, color: "#bfdbfe" }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 11, color: "#60a5fa" }}>{exp.period}</span></div><div style={{ fontSize: 12, color: "#93c5fd", marginBottom: 4 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
      {data.education.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color="#60a5fa">Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13, color: "#bfdbfe" }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 11, color: "#60a5fa" }}>{edu.period}</span></div><div style={{ fontSize: 12, color: "#93c5fd" }}>{edu.school}{edu.gpa && ` · IPK: ${edu.gpa}`}</div></div>))}</div>}
      {data.projects.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color="#60a5fa">Proyek</SectionTitle>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13, color: "#bfdbfe" }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: "#3b82f6" }}>↗ Link</a>}</div>{p.description && <p style={{ fontSize: 11, color: "#94a3b8", margin: "2px 0", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 10, color: "#60a5fa", margin: 0 }}>{p.tech}</p>}</div>))}</div>}
      <CustomSectionsBlock sections={data.customSections} accentColor="#60a5fa" textColor="#94a3b8" titleColor="#60a5fa" dark />
    </div>
  </div>
);

/* ─────────────────────────── CREATIVE ─────────────────────────── */
const CreativeTemplate = ({ data }) => (
  <div style={{ fontFamily: data.fontFamily || "'Inter','Segoe UI',sans-serif", background: "linear-gradient(135deg,#fdf2f8,#f0f9ff)", color: "#1e293b", padding: "36px 36px" }}>
    <div style={{ textAlign: "center", marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <PhotoOrInitial photo={data.photo} name={data.name} size={88} bgFrom="#ec4899" bgTo="#a855f7" border="3px solid white" shadow="0 4px 20px rgba(168,85,247,0.3)" />
      </div>
      <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px", background: "linear-gradient(to right,#ec4899,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{data.name || "Nama Lengkap"}</h1>
      <p style={{ fontSize: 13, color: "#a855f7", margin: "0 0 10px", fontWeight: 600 }}>{data.title || "Jabatan / Role"}</p>
      <ContactRow items={data} color="#64748b" fontSize={11} />
    </div>
    {data.bio && <div style={{ background: "white", borderRadius: 16, padding: "16px 20px", marginBottom: 16, boxShadow: "0 2px 12px rgba(168,85,247,0.1)" }}><SectionTitle color="#ec4899">Tentang Saya</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.8, color: "#475569", margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
    {data.skills.length > 0 && <div style={{ marginBottom: 16 }}><SectionTitle color="#ec4899">Keahlian</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "linear-gradient(to right,#fce7f3,#ede9fe)", color: "#7c3aed", fontWeight: 500 }}>{s}</span>)}</div></div>}
    {data.experience.length > 0 && <div style={{ marginBottom: 16 }}><SectionTitle color="#ec4899">Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ background: "white", borderRadius: 12, padding: "12px 16px", marginBottom: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", borderLeft: "3px solid #ec4899" }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13 }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 10, color: "#94a3b8" }}>{exp.period}</span></div><div style={{ fontSize: 11, color: "#a855f7", marginBottom: 3 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.5, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
    {data.education.length > 0 && <div style={{ marginBottom: 16 }}><SectionTitle color="#ec4899">Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ background: "white", borderRadius: 12, padding: "12px 16px", marginBottom: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12 }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 10, color: "#94a3b8" }}>{edu.period}</span></div><div style={{ fontSize: 11, color: "#a855f7" }}>{edu.school}{edu.gpa && ` · IPK ${edu.gpa}`}</div></div>))}</div>}
    {data.projects.length > 0 && <div style={{ marginBottom: 16 }}><SectionTitle color="#ec4899">Proyek</SectionTitle><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>{data.projects.map((p, i) => (<div key={i} style={{ background: "white", borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><strong style={{ fontSize: 12 }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: "#a855f7" }}>↗</a>}</div>{p.description && <p style={{ fontSize: 10, color: "#64748b", margin: "0 0 4px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 9, color: "#ec4899", margin: 0 }}>{p.tech}</p>}</div>))}</div></div>}
    <CustomSectionsBlock sections={data.customSections} accentColor="#a855f7" textColor="#64748b" titleColor="#ec4899" />
  </div>
);

/* ─────────────────────────── PROFESSIONAL ─────────────────────────── */
const ProfessionalTemplate = ({ data }) => {
  // Hitung minimum content untuk sidebar agar sama tinggi dengan main
  const hasContent = data.bio || data.experience.length > 0 || data.projects.length > 0;

  return (
    <div style={{
      fontFamily: data.fontFamily || "'Inter','Segoe UI',sans-serif",
      display: "flex",
      color: "#1e293b",
      minHeight: 1123  // Force A4 height
    }}>
      {/* SIDEBAR - akan auto stretch karena parent flex */}
      <div style={{
        width: 200,
        flexShrink: 0,
        background: "linear-gradient(180deg,#1a365d,#2a4a7f)",
        color: "white",
        padding: "32px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 20
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <PhotoOrInitial photo={data.photo} name={data.name} size={80} bgFrom="#2563eb" bgTo="#1d4ed8" border="3px solid rgba(255,255,255,0.3)" />
          </div>
          <h1 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 4px", color: "#fff" }}>{data.name || "Nama Lengkap"}</h1>
          <p style={{ fontSize: 11, color: "#93c5fd", margin: 0, fontWeight: 500 }}>{data.title || "Jabatan"}</p>
        </div>

        <div>
          <SectionTitle color="#93c5fd" style={{ marginBottom: 8 }}>Kontak</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 10, color: "#bfdbfe" }}>
            {data.email && <span>✉ {data.email}</span>}
            {data.phone && <span>📞 {data.phone}</span>}
            {data.location && <span>📍 {data.location}</span>}
            {data.website && <span>🌐 {data.website}</span>}
            {data.linkedin && <span>in {data.linkedin}</span>}
            {data.github && <span>⌥ {data.github}</span>}
          </div>
        </div>

        {data.skills.length > 0 && (
          <div>
            <SectionTitle color="#93c5fd" style={{ marginBottom: 8 }}>Keahlian</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {data.skills.map((s, i) => (
                <div key={i}>
                  <span style={{ fontSize: 10, color: "#e2e8f0" }}>{s}</span>
                  <div style={{ height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, marginTop: 2 }}>
                    <div style={{
                      height: "100%",
                      width: `${60 + ((i * 11) % 35)}%`,
                      background: "linear-gradient(to right,#93c5fd,#60a5fa)",
                      borderRadius: 2
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div>
            <SectionTitle color="#93c5fd" style={{ marginBottom: 8 }}>Pendidikan</SectionTitle>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#f0f9ff" }}>{edu.degree || "Gelar"}</div>
                <div style={{ fontSize: 9, color: "#93c5fd" }}>{edu.school}</div>
                <div style={{ fontSize: 9, color: "#64748b" }}>{edu.period}{edu.gpa && ` · ${edu.gpa}`}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div style={{
        flex: 1,
        padding: hasContent ? "32px 32px" : "32px 32px 200px",  // Extra padding jika konten sedikit
        background: "#f8fafc"
      }}>
        {data.bio && (
          <div style={{ marginBottom: 22 }}>
            <h2 style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              color: "#1a365d",
              borderBottom: "2px solid #2b6cb0",
              paddingBottom: 6,
              marginBottom: 10
            }}>Profil</h2>
            <p style={{ fontSize: 12, lineHeight: 1.8, color: "#475569", textAlign: "justify" }}>{data.bio}</p>
          </div>
        )}

        {data.experience.length > 0 && (
          <div style={{ marginBottom: 22 }}>
            <h2 style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              color: "#1a365d",
              borderBottom: "2px solid #2b6cb0",
              paddingBottom: 6,
              marginBottom: 12
            }}>Pengalaman</h2>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 14, paddingLeft: 16, borderLeft: "2px solid #bfdbfe" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong style={{ fontSize: 13 }}>{exp.role || "Posisi"}</strong>
                  <span style={{
                    fontSize: 10,
                    color: "#fff",
                    background: "#2b6cb0",
                    padding: "2px 8px",
                    borderRadius: 4
                  }}>{exp.period}</span>
                </div>
                <div style={{ fontSize: 11, color: "#2b6cb0", fontWeight: 600, marginBottom: 3 }}>{exp.company}</div>
                {exp.description && <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {data.projects.length > 0 && (
          <div>
            <h2 style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              color: "#1a365d",
              borderBottom: "2px solid #2b6cb0",
              paddingBottom: 6,
              marginBottom: 12
            }}>Proyek</h2>
            {data.projects.map((p, i) => (
              <div key={i} style={{
                marginBottom: 12,
                padding: "10px 14px",
                background: "white",
                borderRadius: 8,
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <strong style={{ fontSize: 12 }}>{p.name || "Proyek"}</strong>
                  {p.url && <a href={p.url} style={{ fontSize: 10, color: "#2b6cb0" }}>↗</a>}
                </div>
                {p.description && <p style={{ fontSize: 11, color: "#64748b", margin: "0 0 3px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}
                {p.tech && <p style={{ fontSize: 10, color: "#2b6cb0", margin: 0 }}>{p.tech}</p>}
              </div>
            ))}
          </div>
        )}
        <CustomSectionsBlock sections={data.customSections} accentColor="#2b6cb0" textColor="#64748b" titleColor="#1a365d" />
      </div>
    </div>
  );
};

/* ─────────────────────────── ELEGANT ─────────────────────────── */
const ElegantTemplate = ({ data }) => {
  const gold = "#d4af37";
  const GoldBar = () => <div style={{ width: 3, height: 14, background: gold, borderRadius: 2 }} />;
  return (
    <div style={{ fontFamily: data.fontFamily || "'Georgia','Times New Roman',serif", background: "linear-gradient(135deg,#1a1a2e,#16213e)", color: "#f5f0e8", padding: "44px 48px" }}>
      <div style={{ borderBottom: "1px solid rgba(212,175,55,0.4)", paddingBottom: 20, marginBottom: 24 }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 6px", background: "linear-gradient(to right,#d4af37,#f0c040,#d4af37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{data.name || "Nama Lengkap"}</h1>
        <p style={{ fontSize: 13, color: gold, margin: "0 0 12px", letterSpacing: 2, textTransform: "uppercase", fontStyle: "italic" }}>{data.title || "Jabatan / Role"}</p>
        <ContactRow items={data} color="rgba(245,240,232,0.5)" fontSize={11} />
      </div>
      {data.bio && <div style={{ marginBottom: 24 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><GoldBar /><SectionTitle color={gold} style={{ margin: 0 }}>Profil</SectionTitle></div><p style={{ fontSize: 12, lineHeight: 1.9, color: "rgba(245,240,232,0.7)", fontStyle: "italic", margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
      {data.skills.length > 0 && <div style={{ marginBottom: 24 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><GoldBar /><SectionTitle color={gold} style={{ margin: 0 }}>Kompetensi</SectionTitle></div><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 14px", border: "1px solid rgba(212,175,55,0.4)", borderRadius: 4, color: gold, background: "rgba(212,175,55,0.07)" }}>{s}</span>)}</div></div>}
      {data.experience.length > 0 && <div style={{ marginBottom: 24 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><GoldBar /><SectionTitle color={gold} style={{ margin: 0 }}>Pengalaman</SectionTitle></div>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid rgba(212,175,55,0.1)" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}><strong style={{ fontSize: 13, color: "#f5f0e8" }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 10, color: "rgba(212,175,55,0.6)", fontStyle: "italic" }}>{exp.period}</span></div><div style={{ fontSize: 11, color: gold, marginBottom: 4 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: "rgba(245,240,232,0.55)", lineHeight: 1.7, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
      {data.education.length > 0 && <div style={{ marginBottom: 24 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><GoldBar /><SectionTitle color={gold} style={{ margin: 0 }}>Pendidikan</SectionTitle></div>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12, color: "#f5f0e8" }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 10, color: "rgba(212,175,55,0.6)" }}>{edu.period}</span></div><div style={{ fontSize: 11, color: "rgba(245,240,232,0.5)" }}>{edu.school}{edu.gpa && ` · IPK ${edu.gpa}`}</div></div>))}</div>}
      {data.projects.length > 0 && <div style={{ marginBottom: 24 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><GoldBar /><SectionTitle color={gold} style={{ margin: 0 }}>Proyek</SectionTitle></div>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 10, padding: "12px 16px", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 8, background: "rgba(212,175,55,0.04)" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><strong style={{ fontSize: 12, color: "#f5f0e8" }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: gold }}>↗</a>}</div>{p.description && <p style={{ fontSize: 11, color: "rgba(245,240,232,0.5)", margin: "0 0 3px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 10, color: "rgba(212,175,55,0.6)", margin: 0 }}>{p.tech}</p>}</div>))}</div>}
      <CustomSectionsBlock sections={data.customSections} accentColor={gold} textColor="rgba(245,240,232,0.55)" titleColor={gold} dark />
      <div style={{ borderTop: "1px solid rgba(212,175,55,0.2)", marginTop: 28, paddingTop: 12, textAlign: "center" }}><span style={{ fontSize: 9, color: "rgba(212,175,55,0.3)", letterSpacing: 3, textTransform: "uppercase" }}>{data.name || "Curriculum Vitae"}</span></div>
    </div>
  );
};

/* ─────────────────────────── NEON ─────────────────────────── */
const NeonTemplate = ({ data }) => (
  <div style={{ fontFamily: data.fontFamily || "'Courier New',monospace", background: "#000", color: "#00ff88", padding: "32px 36px" }}>
    <div style={{ border: "1px solid rgba(0,255,136,0.3)", borderRadius: 8, padding: "20px 24px", marginBottom: 24, background: "rgba(0,255,136,0.03)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <PhotoOrInitial photo={data.photo} name={data.name} size={80} bgFrom="#00ff88" bgTo="#00d4ff" border="2px solid #00ff88" shadow="0 0 20px rgba(0,255,136,0.4)" />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px", color: "#00ff88", textShadow: "0 0 20px rgba(0,255,136,0.5)" }}>{data.name || "NAMA_LENGKAP"}</h1>
          <p style={{ fontSize: 12, color: "#00d4ff", margin: "0 0 10px", letterSpacing: 1 }}>{data.title || "JABATAN / ROLE"}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 14px", fontSize: 10, color: "rgba(0,212,255,0.6)" }}>{data.email && <span>✉ {data.email}</span>}{data.phone && <span>☎ {data.phone}</span>}{data.location && <span>◈ {data.location}</span>}{data.github && <span>⌥ {data.github}</span>}</div>
        </div>
      </div>
    </div>
    {data.bio && <div style={{ marginBottom: 20, padding: "14px 18px", border: "1px solid rgba(0,255,136,0.2)", borderRadius: 6, background: "rgba(0,255,136,0.02)" }}><p style={{ fontSize: 12, lineHeight: 1.8, color: "rgba(0,255,136,0.7)", margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
    {data.skills.length > 0 && <div style={{ marginBottom: 20 }}><div style={{ fontSize: 9, color: "rgba(0,255,136,0.4)", letterSpacing: 2, marginBottom: 8 }}>// SKILLS</div><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", border: "1px solid rgba(0,255,136,0.3)", borderRadius: 4, color: "#00ff88", background: "rgba(0,255,136,0.06)" }}>{s}</span>)}</div></div>}
    {data.experience.length > 0 && <div style={{ marginBottom: 20 }}><div style={{ fontSize: 9, color: "rgba(0,255,136,0.4)", letterSpacing: 2, marginBottom: 10 }}>// EXPERIENCE</div>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 12, padding: "12px 16px", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 6, background: "rgba(0,212,255,0.02)", borderLeft: "3px solid #00d4ff" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}><strong style={{ fontSize: 13, color: "#fff" }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 10, color: "rgba(0,212,255,0.6)" }}>{exp.period}</span></div><div style={{ fontSize: 11, color: "#00d4ff", marginBottom: 3 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: "rgba(0,255,136,0.5)", lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
    {data.education.length > 0 && <div style={{ marginBottom: 20 }}><div style={{ fontSize: 9, color: "rgba(0,255,136,0.4)", letterSpacing: 2, marginBottom: 10 }}>// EDUCATION</div>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 8, padding: "10px 14px", border: "1px solid rgba(0,255,136,0.15)", borderRadius: 6 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12, color: "#fff" }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 10, color: "rgba(0,255,136,0.5)" }}>{edu.period}</span></div><div style={{ fontSize: 11, color: "rgba(0,212,255,0.7)" }}>{edu.school}{edu.gpa && ` :: IPK ${edu.gpa}`}</div></div>))}</div>}
    {data.projects.length > 0 && <div style={{ marginBottom: 20 }}><div style={{ fontSize: 9, color: "rgba(0,255,136,0.4)", letterSpacing: 2, marginBottom: 10 }}>// PROJECTS</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>{data.projects.map((p, i) => (<div key={i} style={{ padding: "12px 14px", border: "1px solid rgba(0,255,136,0.2)", borderRadius: 6, background: "rgba(0,255,136,0.03)" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><strong style={{ fontSize: 12, color: "#00ff88" }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: "#00d4ff" }}>↗</a>}</div>{p.description && <p style={{ fontSize: 10, color: "rgba(0,255,136,0.5)", margin: "0 0 4px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 9, color: "#00d4ff", margin: 0 }}>{p.tech}</p>}</div>))}</div></div>}
    <CustomSectionsBlock sections={data.customSections} accentColor="#00d4ff" textColor="rgba(0,255,136,0.5)" titleColor="rgba(0,255,136,0.4)" dark />
    <div style={{ marginTop: 24, paddingTop: 12, borderTop: "1px solid rgba(0,255,136,0.1)", textAlign: "center" }}><span style={{ fontSize: 9, color: "rgba(0,255,136,0.2)", letterSpacing: 3 }}>END OF FILE</span></div>
  </div>
);

/* ─────────────────────────── SUNSET ─────────────────────────── */
const SunsetTemplate = ({ data }) => (
  <div style={{ fontFamily: data.fontFamily || "'Inter','Segoe UI',sans-serif", background: "#fff7ed", color: "#1c0a00" }}>
    <div style={{ background: "linear-gradient(135deg,#ea580c 0%,#dc2626 50%,#9333ea 100%)", padding: "36px 40px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
      <div style={{ position: "absolute", bottom: -20, left: 60, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 20, position: "relative" }}>
        <PhotoOrInitial photo={data.photo} name={data.name} size={84} bgFrom="rgba(255,255,255,0.3)" bgTo="rgba(255,255,255,0.15)" border="3px solid rgba(255,255,255,0.6)" shadow="0 4px 20px rgba(0,0,0,0.3)" />
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", color: "#fff" }}>{data.name || "Nama Lengkap"}</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", margin: "0 0 12px", fontWeight: 600 }}>{data.title || "Jabatan / Role"}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 14px", fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{data.location && <span>📍 {data.location}</span>}{data.email && <span>✉ {data.email}</span>}{data.phone && <span>📞 {data.phone}</span>}{data.website && <span>🌐 {data.website}</span>}</div>
        </div>
      </div>
    </div>
    <div style={{ padding: "28px 40px" }}>
      {data.bio && <div style={{ marginBottom: 22, padding: "16px 20px", background: "white", borderRadius: 12, boxShadow: "0 2px 12px rgba(234,88,12,0.08)", borderLeft: "4px solid #ea580c" }}><SectionTitle color="#ea580c">Tentang Saya</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.8, color: "#374151", margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
      {data.skills.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color="#dc2626">Keahlian</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "5px 14px", borderRadius: 20, background: ["#fef3c7","#fde8d8","#fce7f3","#ede9fe","#dbeafe"][i%5], color: ["#92400e","#9a3412","#9d174d","#5b21b6","#1e40af"][i%5], fontWeight: 600 }}>{s}</span>)}</div></div>}
      {data.experience.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color="#dc2626">Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 14, padding: "14px 18px", background: "white", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderTop: `3px solid ${["#ea580c","#dc2626","#9333ea","#2563eb","#059669"][i%5]}` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><strong style={{ fontSize: 13, color: "#1c1917" }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 10, color: "#fff", background: "linear-gradient(to right,#ea580c,#dc2626)", padding: "2px 10px", borderRadius: 10 }}>{exp.period}</span></div><div style={{ fontSize: 11, color: "#9333ea", fontWeight: 600, marginBottom: 3 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
      {data.education.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color="#dc2626">Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 10, padding: "12px 16px", background: "white", borderRadius: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12, color: "#1c1917" }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 10, color: "#9333ea" }}>{edu.period}</span></div><div style={{ fontSize: 11, color: "#ea580c" }}>{edu.school}{edu.gpa && ` · IPK ${edu.gpa}`}</div></div>))}</div>}
      {data.projects.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color="#dc2626">Proyek</SectionTitle><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{data.projects.map((p, i) => (<div key={i} style={{ padding: "14px", background: "white", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderBottom: `3px solid ${["#ea580c","#dc2626","#9333ea","#2563eb"][i%4]}` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><strong style={{ fontSize: 12, color: "#1c1917" }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: "#9333ea" }}>↗</a>}</div>{p.description && <p style={{ fontSize: 10, color: "#6b7280", margin: "0 0 4px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 9, color: "#ea580c", margin: 0, fontWeight: 600 }}>{p.tech}</p>}</div>))}</div></div>}
      <CustomSectionsBlock sections={data.customSections} accentColor="#dc2626" textColor="#6b7280" titleColor="#dc2626" />
    </div>
  </div>
);

/* ─────────────────────────── FOREST ─────────────────────────── */
const ForestTemplate = ({ data }) => (
  <div style={{ fontFamily: data.fontFamily || "'Georgia',serif", background: "#f0fdf4", color: "#14532d" }}>
    <div style={{ background: "linear-gradient(135deg,#166534,#15803d)", padding: "32px 40px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px", color: "#fff" }}>{data.name || "Nama Lengkap"}</h1>
      <p style={{ fontSize: 13, color: "#bbf7d0", margin: "0 0 12px", fontStyle: "italic" }}>{data.title || "Jabatan / Role"}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 16px", fontSize: 11, color: "rgba(187,247,208,0.7)" }}>{data.location && <span>🌿 {data.location}</span>}{data.email && <span>✉ {data.email}</span>}{data.phone && <span>📞 {data.phone}</span>}{data.website && <span>🌐 {data.website}</span>}{data.linkedin && <span>in {data.linkedin}</span>}{data.github && <span>⌥ {data.github}</span>}</div>
    </div>
    <div style={{ padding: "28px 40px" }}>
      {data.bio && <div style={{ marginBottom: 22, padding: "16px 20px", background: "white", borderRadius: 12, boxShadow: "0 2px 10px rgba(21,128,61,0.08)", border: "1px solid #bbf7d0" }}><SectionTitle color="#166534">Profil</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.8, color: "#374151", margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
      {data.skills.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color="#166534">Keahlian</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 6, background: "#dcfce7", border: "1px solid #86efac", color: "#166534", fontWeight: 500 }}>{s}</span>)}</div></div>}
      {data.experience.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color="#166534">Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 14, padding: "14px 18px", background: "white", borderRadius: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", borderLeft: "4px solid #22c55e" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><strong style={{ fontSize: 13 }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 10, color: "#166534", background: "#dcfce7", padding: "2px 8px", borderRadius: 10 }}>{exp.period}</span></div><div style={{ fontSize: 11, color: "#15803d", fontWeight: 600, marginBottom: 3 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
      {data.education.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color="#166534">Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 10, padding: "12px 16px", background: "white", borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12 }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 10, color: "#15803d" }}>{edu.period}</span></div><div style={{ fontSize: 11, color: "#4ade80" }}>{edu.school}{edu.gpa && ` · IPK ${edu.gpa}`}</div></div>))}</div>}
      {data.projects.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color="#166534">Proyek</SectionTitle>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 10, padding: "12px 16px", background: "white", borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #bbf7d0" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><strong style={{ fontSize: 12 }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: "#15803d" }}>↗</a>}</div>{p.description && <p style={{ fontSize: 11, color: "#6b7280", margin: "0 0 3px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 10, color: "#15803d", margin: 0 }}>{p.tech}</p>}</div>))}</div>}
      <CustomSectionsBlock sections={data.customSections} accentColor="#166534" textColor="#6b7280" titleColor="#166534" />
    </div>
  </div>
);

/* ─────── AURORA — FIXED: position:"absolute" bukan "fixed" ────── */
const AuroraTemplate = ({ data }) => (
  <div style={{ fontFamily: data.fontFamily || "'Inter',sans-serif", background: "linear-gradient(135deg, #4c1d95, #1e3a8a)", color: "#e0f2fe", height: "100%", backgroundSize: "cover" }}> {/* Fix: height 100% dan backgroundSize cover untuk full gradient */}
    <div style={{ padding: "32px 40px", background: "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
        <PhotoOrInitial photo={data.photo} name={data.name} size={64} bgFrom="#a78bfa" bgTo="#38bdf8" border="2px solid rgba(255,255,255,0.2)" shadow="0 4px 12px rgba(0,0,0,0.3)" />
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: "#fff" }}>{data.name || "Nama Lengkap"}</h1>
          <p style={{ fontSize: 14, color: "#a5f3fc", margin: "4px 0 0" }}>{data.title || "Jabatan / Role"}</p>
        </div>
      </div>
      <ContactRow items={data} color="#bfdbfe" fontSize={11} />
    </div>
    <div style={{ padding: "0 40px 32px" }}>
      {data.bio && <div style={{ marginBottom: 24, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 16 }}><SectionTitle color="#a78bfa" style={{ marginBottom: 8 }}>Tentang Saya</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.8, color: "#bfdbfe", margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
      {data.skills.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color="#a78bfa">Keahlian</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 9999, background: "linear-gradient(135deg,rgba(167,139,250,0.2),rgba(56,189,248,0.2))", border: "1px solid rgba(167,139,250,0.3)", color: "#e0f2fe" }}>{s}</span>)}</div></div>}
      {data.experience.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color="#a78bfa">Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 16, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.1)" }}><strong style={{ fontSize: 13, color: "#fff", display: "block" }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 11, color: "#38bdf8" }}>{exp.company} · {exp.period}</span>{exp.description && <p style={{ fontSize: 11, color: "#bfdbfe", marginTop: 8, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
      {data.education.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color="#a78bfa">Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 12 }}><strong style={{ fontSize: 13, color: "#fff" }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 12, color: "#38bdf8", display: "block" }}>{edu.school} · {edu.period}{edu.gpa && ` (IPK ${edu.gpa})`}</span></div>))}</div>}
      {data.projects.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color="#a78bfa">Proyek</SectionTitle>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 12 }}><strong style={{ fontSize: 13, color: "#fff" }}>{p.name || "Proyek"}</strong>{p.description && <p style={{ fontSize: 11, color: "#bfdbfe", margin: "4px 0", textAlign: "justify" }}>{p.description}</p>}{p.tech && <span style={{ fontSize: 10, color: "#38bdf8" }}>{p.tech}</span>}{p.url && <a href={p.url} style={{ fontSize: 10, color: "#a78bfa", display: "block" }}>↗ Link</a>}</div>))}</div>}
      <CustomSectionsBlock sections={data.customSections} accentColor="#a78bfa" textColor="#bfdbfe" titleColor="#a78bfa" dark />
    </div>
  </div>
);

/* ─────────────────────────── RETRO ─────────────────────────── */
const RetroTemplate = ({ data }) => {
  const brown = "#451a03", amber = "#92400e";
  return (
    <div style={{ fontFamily: data.fontFamily || "'Courier New',Courier,monospace", background: "#fef9c3", color: brown, padding: "36px 44px", backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 27px,rgba(120,80,20,0.05) 27px,rgba(120,80,20,0.05) 28px)" }}>
      <div style={{ textAlign: "center", borderBottom: "4px double #92400e", borderTop: "4px double #92400e", padding: "12px 0", marginBottom: 20 }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: amber, marginBottom: 4, textTransform: "uppercase" }}>— Curriculum Vitae —</div>
        <h1 style={{ fontSize: 30, fontWeight: 900, margin: "0 0 4px", letterSpacing: "1px", color: brown, textTransform: "uppercase", fontFamily: "'Georgia',serif" }}>{data.name || "NAMA LENGKAP"}</h1>
        <div style={{ fontSize: 12, color: amber, fontStyle: "italic", marginBottom: 6 }}>{data.title || "Jabatan / Role"}</div>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 20px", fontSize: 10, color: "#78350f" }}>{data.email && <span>✉ {data.email}</span>}{data.phone && <span>✆ {data.phone}</span>}{data.location && <span>⚑ {data.location}</span>}{data.website && <span>⚇ {data.website}</span>}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "0 28px" }}>
        <div>
          {data.bio && <div style={{ marginBottom: 18 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: amber, borderBottom: "2px solid #d97706", paddingBottom: 4, marginBottom: 8 }}>◆ Profil</div><p style={{ fontSize: 12, lineHeight: 1.9, color: "#292524", textAlign: "justify", margin: 0, textIndent: 16 }}>{data.bio}</p></div>}
          {data.experience.length > 0 && <div style={{ marginBottom: 18 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: amber, borderBottom: "2px solid #d97706", paddingBottom: 4, marginBottom: 10 }}>◆ Pengalaman</div>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px dashed rgba(146,64,14,0.3)" }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12, fontFamily: "'Georgia',serif" }}>{exp.role || "Posisi"}</strong><em style={{ fontSize: 10, color: amber }}>{exp.period}</em></div><div style={{ fontSize: 11, color: "#b45309", marginBottom: 2, fontStyle: "italic" }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: "#44403c", lineHeight: 1.7, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
          {data.projects.length > 0 && <div><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: amber, borderBottom: "2px solid #d97706", paddingBottom: 4, marginBottom: 10 }}>◆ Proyek</div>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: "1px dashed rgba(146,64,14,0.3)" }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12, fontFamily: "'Georgia',serif" }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: "#b45309" }}>↗</a>}</div>{p.description && <p style={{ fontSize: 11, color: "#44403c", margin: "2px 0", lineHeight: 1.6, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 10, color: "#92400e", margin: 0, fontStyle: "italic" }}>Tech: {p.tech}</p>}</div>))}</div>}
          <CustomSectionsBlock sections={data.customSections} accentColor={amber} textColor="#44403c" titleColor={amber} />
        </div>
        <div style={{ borderLeft: "2px solid #d97706", paddingLeft: 20 }}>
          {data.skills.length > 0 && <div style={{ marginBottom: 18 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: amber, borderBottom: "2px solid #d97706", paddingBottom: 4, marginBottom: 8 }}>◆ Keahlian</div><div style={{ display: "flex", flexDirection: "column", gap: 4 }}>{data.skills.map((s, i) => <div key={i} style={{ fontSize: 11, color: "#292524", paddingLeft: 8, borderLeft: "2px solid #d97706" }}>· {s}</div>)}</div></div>}
          {data.education.length > 0 && <div style={{ marginBottom: 18 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: amber, borderBottom: "2px solid #d97706", paddingBottom: 4, marginBottom: 8 }}>◆ Pendidikan</div>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 10 }}><strong style={{ fontSize: 11, fontFamily: "'Georgia',serif", color: brown }}>{edu.degree || "Gelar"}</strong><div style={{ fontSize: 10, color: "#b45309", fontStyle: "italic" }}>{edu.school}</div><div style={{ fontSize: 10, color: amber }}>{edu.period}{edu.gpa && ` · IPK ${edu.gpa}`}</div></div>))}</div>}
          {(data.linkedin || data.github) && <div><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: amber, borderBottom: "2px solid #d97706", paddingBottom: 4, marginBottom: 8 }}>◆ Tautan</div>{data.linkedin && <div style={{ fontSize: 10, color: "#292524", marginBottom: 4 }}>in {data.linkedin}</div>}{data.github && <div style={{ fontSize: 10, color: "#292524" }}>⌥ {data.github}</div>}</div>}
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 24, fontSize: 9, color: "#92400e", borderTop: "2px double #d97706", paddingTop: 8, letterSpacing: 3 }}>— END — · {data.name || "CURRICULUM VITAE"} · PRINTED WITH CARE —</div>
    </div>
  );
};

/* ─────────────────────────── ENTRY POINT ─────────────────────────── */
export const templateMap = {
  minimal: MinimalTemplate,
  modern: ModernTemplate,
  creative: CreativeTemplate,
  professional: ProfessionalTemplate,
  elegant: ElegantTemplate,
  neon: NeonTemplate,
  sunset: SunsetTemplate,
  forest: ForestTemplate,
  aurora: AuroraTemplate,
  retro: RetroTemplate,
};

export const RESUME_WIDTH = 794; // A4 @ 96dpi, dipakai juga sebagai lebar cetak PDF
export const RESUME_MIN_HEIGHT = 1123; // A4 @ 96dpi
