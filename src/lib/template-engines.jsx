/*
 * Semua template CV PortoInstant, dibangun sebagai "layout engine" yang
 * menerima `theme` (7 slot warna: accent, accent2, bg, surface, text,
 * muted, onAccent) sehingga WARNA bisa dikustomisasi user lewat
 * data.customColors -- tanpa perlu template terpisah hanya untuk beda
 * warna (itulah kenapa versi sebelumnya yang punya 40 "template warna"
 * dihapus dan diganti satu sistem kustomisasi warna).
 *
 * Setiap layout (struktur) hanya ada SATU implementasi. Variasi yang
 * sebelumnya berupa "template terpisah cuma beda warna" sekarang jadi
 * satu fitur "Sesuaikan Warna" di Builder yang berlaku ke semua template.
 *
 * Semua tetap memakai helper yang SAMA (PhotoOrInitial, SectionTitle,
 * ContactRow, CustomSectionsBlock) dari cv-templates.jsx, dan dipakai oleh
 * preview (client) maupun generator PDF (server) lewat satu templateMap --
 * sinkronisasi preview <-> PDF tetap terjamin dari satu sumber kode.
 */

import {
  Mail, Phone, MapPin, Globe, Linkedin, Github,
} from "lucide-react";
import {
  PhotoOrInitial,
  SectionTitle,
  ContactRow,
  CustomSectionsBlock,
} from "@/lib/cv-templates";

export const IconRow = ({ data, color, iconColor, fontSize = 10.5, gap = 6 }) => {
  const items = [
    data.email && { icon: Mail, text: data.email },
    data.phone && { icon: Phone, text: data.phone },
    data.location && { icon: MapPin, text: data.location },
    data.website && { icon: Globe, text: data.website },
    data.linkedin && { icon: Linkedin, text: data.linkedin },
    data.github && { icon: Github, text: data.github },
  ].filter(Boolean);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap, fontSize, color }}>
          <it.icon size={11} color={iconColor || color} style={{ flexShrink: 0 }} />
          <span>{it.text}</span>
        </div>
      ))}
    </div>
  );
};

/* ════════════════════════ 1. Border Header (Minimal) ════════════════════════ */
export const BorderHeaderTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || "Georgia,serif", background: theme.bg, color: theme.text, padding: "40px 44px", height: "100%" }}>
    <div style={{ borderBottom: `2px solid ${theme.text}`, paddingBottom: 16, marginBottom: 20 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.5px" }}>{data.name || "Nama Lengkap"}</h1>
      <p style={{ fontSize: 14, color: theme.muted, margin: "0 0 10px", fontStyle: "italic" }}>{data.title || "Jabatan / Role"}</p>
      <ContactRow items={data} color={theme.muted} />
    </div>
    {data.bio && <div style={{ marginBottom: 20 }}><SectionTitle color={theme.accent}>Profil</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.7, color: theme.text, margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
    {data.skills.length > 0 && <div style={{ marginBottom: 20 }}><SectionTitle color={theme.accent}>Keahlian</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "3px 10px", border: `1px solid ${theme.accent}`, borderRadius: 4, color: theme.text }}>{s}</span>)}</div></div>}
    {data.experience.length > 0 && <div style={{ marginBottom: 20 }}><SectionTitle color={theme.accent}>Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><strong style={{ fontSize: 13 }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 11, color: theme.muted }}>{exp.period}</span></div><div style={{ fontSize: 12, color: theme.accent, marginBottom: 2 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: theme.muted, lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
    {data.education.length > 0 && <div style={{ marginBottom: 20 }}><SectionTitle color={theme.accent}>Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13 }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 11, color: theme.muted }}>{edu.period}</span></div><div style={{ fontSize: 12, color: theme.accent }}>{edu.school}{edu.gpa && ` · IPK: ${edu.gpa}`}</div></div>))}</div>}
    {data.projects.length > 0 && <div style={{ marginBottom: 20 }}><SectionTitle color={theme.accent}>Proyek</SectionTitle>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13 }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent }}>↗ Link</a>}</div>{p.description && <p style={{ fontSize: 11, color: theme.muted, margin: "2px 0", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 10, color: theme.muted, margin: 0 }}>{p.tech}</p>}</div>))}</div>}
    <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent} textColor={theme.muted} titleColor={theme.accent} />
  </div>
);
export const MINIMAL_THEME = { accent: "#475569", accent2: "#475569", bg: "#ffffff", surface: "#ffffff", text: "#1e293b", muted: "#64748b", onAccent: "#ffffff" };

/* ════════════════════════ 2. Gradient Banner (Modern) ════════════════════════ */
export const GradientBannerTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || "Arial,sans-serif", background: theme.bg, color: theme.text, height: "100%" }}>
    <div style={{ background: `linear-gradient(135deg,${theme.accent2},${theme.accent})`, padding: "32px 40px 28px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", color: theme.onAccent, letterSpacing: "-0.5px" }}>{data.name || "Nama Lengkap"}</h1>
      <p style={{ fontSize: 14, color: `${theme.onAccent}cc`, margin: "0 0 14px", fontWeight: 500 }}>{data.title || "Jabatan / Role"}</p>
      <ContactRow items={data} color={`${theme.onAccent}cc`} fontSize={11} />
    </div>
    <div style={{ padding: "28px 40px" }}>
      {data.bio && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accent}>Tentang Saya</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.8, color: theme.muted, margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
      {data.skills.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accent}>Tech Stack</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: `${theme.accent}1f`, border: `1px solid ${theme.accent}66`, color: theme.accent }}>{s}</span>)}</div></div>}
      {data.experience.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accent}>Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 16, background: theme.surface, borderRadius: 8, padding: 12, border: `1px solid ${theme.accent}40` }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><strong style={{ fontSize: 13 }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 11, color: theme.accent }}>{exp.period}</span></div><div style={{ fontSize: 12, color: theme.accent, marginBottom: 4 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: theme.muted, lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
      {data.education.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accent}>Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13 }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 11, color: theme.accent }}>{edu.period}</span></div><div style={{ fontSize: 12, color: theme.muted }}>{edu.school}{edu.gpa && ` · IPK: ${edu.gpa}`}</div></div>))}</div>}
      {data.projects.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accent}>Proyek</SectionTitle>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13 }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent }}>↗ Link</a>}</div>{p.description && <p style={{ fontSize: 11, color: theme.muted, margin: "2px 0", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 10, color: theme.accent, margin: 0 }}>{p.tech}</p>}</div>))}</div>}
      <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent} textColor={theme.muted} titleColor={theme.accent} dark />
    </div>
  </div>
);
export const MODERN_THEME = { accent: "#60a5fa", accent2: "#1e3a8a", bg: "#0f172a", surface: "rgba(30,58,138,0.15)", text: "#e2e8f0", muted: "#94a3b8", onAccent: "#ffffff" };

/* ════════════════════════ 3. Sidebar (Professional) ════════════════════════ */
export const SidebarTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || "Arial,sans-serif", display: "flex", color: theme.text, minHeight: 1123 }}>
    <div style={{ width: 200, flexShrink: 0, background: `linear-gradient(180deg,${theme.accent2},${theme.accent})`, color: theme.onAccent, padding: "32px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <PhotoOrInitial photo={data.photo} name={data.name} size={80} bgFrom={theme.accent} bgTo={theme.accent2} border={`3px solid ${theme.onAccent}4d`} />
        </div>
        <h1 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 4px", color: theme.onAccent }}>{data.name || "Nama Lengkap"}</h1>
        <p style={{ fontSize: 11, color: `${theme.onAccent}b3`, margin: 0, fontWeight: 500 }}>{data.title || "Jabatan"}</p>
      </div>
      <div>
        <SectionTitle color={`${theme.onAccent}b3`} style={{ marginBottom: 8 }}>Kontak</SectionTitle>
        <IconRow data={data} color={theme.onAccent} iconColor={`${theme.onAccent}b3`} fontSize={10} />
      </div>
      {data.skills.length > 0 && (
        <div>
          <SectionTitle color={`${theme.onAccent}b3`} style={{ marginBottom: 8 }}>Keahlian</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {data.skills.map((s, i) => (
              <div key={i}>
                <span style={{ fontSize: 10, color: theme.onAccent }}>{s}</span>
                <div style={{ height: 3, background: `${theme.onAccent}26`, borderRadius: 2, marginTop: 2 }}>
                  <div style={{ height: "100%", width: `${60 + ((i * 11) % 35)}%`, background: `${theme.onAccent}b3`, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.education.length > 0 && (
        <div>
          <SectionTitle color={`${theme.onAccent}b3`} style={{ marginBottom: 8 }}>Pendidikan</SectionTitle>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: theme.onAccent }}>{edu.degree || "Gelar"}</div>
              <div style={{ fontSize: 9, color: `${theme.onAccent}b3` }}>{edu.school}</div>
              <div style={{ fontSize: 9, color: `${theme.onAccent}80` }}>{edu.period}{edu.gpa && ` · ${edu.gpa}`}</div>
            </div>
          ))}
        </div>
      )}
    </div>
    <div style={{ flex: 1, padding: "32px 32px", background: theme.bg }}>
      {data.bio && (
        <div style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: theme.text, borderBottom: `2px solid ${theme.accent}`, paddingBottom: 6, marginBottom: 10 }}>Profil</h2>
          <p style={{ fontSize: 12, lineHeight: 1.8, color: theme.muted, textAlign: "justify" }}>{data.bio}</p>
        </div>
      )}
      {data.experience.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: theme.text, borderBottom: `2px solid ${theme.accent}`, paddingBottom: 6, marginBottom: 12 }}>Pengalaman</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 14, paddingLeft: 16, borderLeft: `2px solid ${theme.accent}` }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 13 }}>{exp.role || "Posisi"}</strong>
                <span style={{ fontSize: 10, color: theme.onAccent, background: theme.accent, padding: "2px 8px", borderRadius: 4 }}>{exp.period}</span>
              </div>
              <div style={{ fontSize: 11, color: theme.accent, fontWeight: 600, marginBottom: 3 }}>{exp.company}</div>
              {exp.description && <p style={{ fontSize: 11, color: theme.muted, lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}
      {data.projects.length > 0 && (
        <div>
          <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: theme.text, borderBottom: `2px solid ${theme.accent}`, paddingBottom: 6, marginBottom: 12 }}>Proyek</h2>
          {data.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 12, padding: "10px 14px", background: theme.surface, borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <strong style={{ fontSize: 12 }}>{p.name || "Proyek"}</strong>
                {p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent }}>↗</a>}
              </div>
              {p.description && <p style={{ fontSize: 11, color: theme.muted, margin: "0 0 3px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}
              {p.tech && <p style={{ fontSize: 10, color: theme.accent, margin: 0 }}>{p.tech}</p>}
            </div>
          ))}
        </div>
      )}
      <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent} textColor={theme.muted} titleColor={theme.text} />
    </div>
  </div>
);
export const PROFESSIONAL_THEME = { accent: "#2b6cb0", accent2: "#1a365d", bg: "#f8fafc", surface: "#ffffff", text: "#1e293b", muted: "#64748b", onAccent: "#ffffff" };

/* ════════════════════════ 4. Centered Photo (Creative) ════════════════════════ */
export const CenteredPhotoTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || "Verdana,sans-serif", background: theme.bg, color: theme.text, padding: "36px 36px" }}>
    <div style={{ textAlign: "center", marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <PhotoOrInitial photo={data.photo} name={data.name} size={88} bgFrom={theme.accent} bgTo={theme.accent2} border="3px solid white" shadow="0 4px 20px rgba(0,0,0,0.15)" />
      </div>
      <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px", background: `linear-gradient(to right,${theme.accent},${theme.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{data.name || "Nama Lengkap"}</h1>
      <p style={{ fontSize: 13, color: theme.accent2, margin: "0 0 10px", fontWeight: 600 }}>{data.title || "Jabatan / Role"}</p>
      <ContactRow items={data} color={theme.muted} fontSize={11} />
    </div>
    {data.bio && <div style={{ background: theme.surface, borderRadius: 16, padding: "16px 20px", marginBottom: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}><SectionTitle color={theme.accent}>Tentang Saya</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.8, color: theme.muted, margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
    {data.skills.length > 0 && <div style={{ marginBottom: 16 }}><SectionTitle color={theme.accent}>Keahlian</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: `linear-gradient(to right,${theme.accent}26,${theme.accent2}26)`, color: theme.accent2, fontWeight: 500 }}>{s}</span>)}</div></div>}
    {data.experience.length > 0 && <div style={{ marginBottom: 16 }}><SectionTitle color={theme.accent}>Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ background: theme.surface, borderRadius: 12, padding: "12px 16px", marginBottom: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", borderLeft: `3px solid ${theme.accent}` }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13 }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 10, color: theme.muted }}>{exp.period}</span></div><div style={{ fontSize: 11, color: theme.accent2, marginBottom: 3 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: theme.muted, lineHeight: 1.5, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
    {data.education.length > 0 && <div style={{ marginBottom: 16 }}><SectionTitle color={theme.accent}>Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ background: theme.surface, borderRadius: 12, padding: "12px 16px", marginBottom: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12 }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 10, color: theme.muted }}>{edu.period}</span></div><div style={{ fontSize: 11, color: theme.accent2 }}>{edu.school}{edu.gpa && ` · IPK ${edu.gpa}`}</div></div>))}</div>}
    {data.projects.length > 0 && <div style={{ marginBottom: 16 }}><SectionTitle color={theme.accent}>Proyek</SectionTitle><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>{data.projects.map((p, i) => (<div key={i} style={{ background: theme.surface, borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><strong style={{ fontSize: 12 }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent2 }}>↗</a>}</div>{p.description && <p style={{ fontSize: 10, color: theme.muted, margin: "0 0 4px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 9, color: theme.accent, margin: 0 }}>{p.tech}</p>}</div>))}</div></div>}
    <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent2} textColor={theme.muted} titleColor={theme.accent} />
  </div>
);
export const CREATIVE_THEME = { accent: "#ec4899", accent2: "#a855f7", bg: "#fdf2f8", surface: "#ffffff", text: "#1e293b", muted: "#64748b", onAccent: "#ffffff" };

/* ════════════════════════ 5. Dark Serif (Elegant) ════════════════════════ */
export const DarkSerifTemplate = ({ data, theme }) => {
  const GoldBar = () => <div style={{ width: 3, height: 14, background: theme.accent, borderRadius: 2 }} />;
  return (
    <div style={{ fontFamily: data.fontFamily || "Garamond,serif", background: theme.bg, color: theme.text, padding: "44px 48px" }}>
      <div style={{ borderBottom: `1px solid ${theme.accent}40`, paddingBottom: 20, marginBottom: 24 }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 6px", color: theme.accent }}>{data.name || "Nama Lengkap"}</h1>
        <p style={{ fontSize: 13, color: theme.accent, margin: "0 0 12px", letterSpacing: 2, textTransform: "uppercase", fontStyle: "italic" }}>{data.title || "Jabatan / Role"}</p>
        <ContactRow items={data} color={theme.muted} fontSize={11} />
      </div>
      {data.bio && <div style={{ marginBottom: 24 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><GoldBar /><SectionTitle color={theme.accent} style={{ margin: 0 }}>Profil</SectionTitle></div><p style={{ fontSize: 12, lineHeight: 1.9, color: theme.muted, fontStyle: "italic", margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
      {data.skills.length > 0 && <div style={{ marginBottom: 24 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><GoldBar /><SectionTitle color={theme.accent} style={{ margin: 0 }}>Kompetensi</SectionTitle></div><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 14px", border: `1px solid ${theme.accent}66`, borderRadius: 4, color: theme.accent, background: `${theme.accent}12` }}>{s}</span>)}</div></div>}
      {data.experience.length > 0 && <div style={{ marginBottom: 24 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><GoldBar /><SectionTitle color={theme.accent} style={{ margin: 0 }}>Pengalaman</SectionTitle></div>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${theme.accent}1a` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}><strong style={{ fontSize: 13, color: theme.text }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 10, color: theme.accent, fontStyle: "italic" }}>{exp.period}</span></div><div style={{ fontSize: 11, color: theme.accent, marginBottom: 4 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: theme.muted, lineHeight: 1.7, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
      {data.education.length > 0 && <div style={{ marginBottom: 24 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><GoldBar /><SectionTitle color={theme.accent} style={{ margin: 0 }}>Pendidikan</SectionTitle></div>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12, color: theme.text }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 10, color: theme.accent }}>{edu.period}</span></div><div style={{ fontSize: 11, color: theme.muted }}>{edu.school}{edu.gpa && ` · IPK ${edu.gpa}`}</div></div>))}</div>}
      {data.projects.length > 0 && <div style={{ marginBottom: 24 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><GoldBar /><SectionTitle color={theme.accent} style={{ margin: 0 }}>Proyek</SectionTitle></div>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 10, padding: "12px 16px", border: `1px solid ${theme.accent}33`, borderRadius: 8, background: `${theme.accent}0a` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><strong style={{ fontSize: 12, color: theme.text }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent }}>↗</a>}</div>{p.description && <p style={{ fontSize: 11, color: theme.muted, margin: "0 0 3px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 10, color: theme.accent, margin: 0 }}>{p.tech}</p>}</div>))}</div>}
      <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent} textColor={theme.muted} titleColor={theme.accent} dark />
      <div style={{ borderTop: `1px solid ${theme.accent}33`, marginTop: 28, paddingTop: 12, textAlign: "center" }}><span style={{ fontSize: 9, color: theme.accent, letterSpacing: 3, textTransform: "uppercase" }}>{data.name || "Curriculum Vitae"}</span></div>
    </div>
  );
};
export const ELEGANT_THEME = { accent: "#d4af37", accent2: "#f0c040", bg: "#1a1a2e", surface: "rgba(212,175,55,0.07)", text: "#f5f0e8", muted: "rgba(245,240,232,0.55)", onAccent: "#1a1a2e" };

/* ════════════════════════ 6. Boxed Photo (Neon) ════════════════════════ */
export const BoxedPhotoTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || "'Courier New',monospace", background: theme.bg, color: theme.accent, padding: "32px 36px" }}>
    <div style={{ border: `1px solid ${theme.accent}4d`, borderRadius: 8, padding: "20px 24px", marginBottom: 24, background: `${theme.accent}0a` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <PhotoOrInitial photo={data.photo} name={data.name} size={76} bgFrom={theme.accent} bgTo={theme.accent2} border={`2px solid ${theme.accent}`} />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 23, fontWeight: 700, margin: "0 0 4px", color: theme.accent }}>{data.name || "Nama Lengkap"}</h1>
          <p style={{ fontSize: 12, color: theme.accent2, margin: "0 0 10px", letterSpacing: 1 }}>{data.title || "Jabatan / Role"}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 14px", fontSize: 10, color: theme.muted }}>{data.email && <span>✉ {data.email}</span>}{data.phone && <span>☎ {data.phone}</span>}{data.location && <span>◈ {data.location}</span>}{data.github && <span>⌥ {data.github}</span>}</div>
        </div>
      </div>
    </div>
    {data.bio && <div style={{ marginBottom: 20, padding: "14px 18px", border: `1px solid ${theme.accent}4d`, borderRadius: 6, background: `${theme.accent}0a` }}><p style={{ fontSize: 12, lineHeight: 1.8, color: theme.muted, margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
    {data.skills.length > 0 && <div style={{ marginBottom: 20 }}><div style={{ fontSize: 9, color: theme.muted, letterSpacing: 2, marginBottom: 8 }}>// SKILLS</div><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", border: `1px solid ${theme.accent}4d`, borderRadius: 4, color: theme.accent, background: `${theme.accent}0f` }}>{s}</span>)}</div></div>}
    {data.experience.length > 0 && <div style={{ marginBottom: 20 }}><div style={{ fontSize: 9, color: theme.muted, letterSpacing: 2, marginBottom: 10 }}>// EXPERIENCE</div>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 12, padding: "12px 16px", border: `1px solid ${theme.accent2}33`, borderRadius: 6, background: `${theme.accent2}0a`, borderLeft: `3px solid ${theme.accent2}` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}><strong style={{ fontSize: 13, color: theme.onAccent === "#000000" ? "#fff" : theme.onAccent }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 10, color: theme.accent2 }}>{exp.period}</span></div><div style={{ fontSize: 11, color: theme.accent2, marginBottom: 3 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: theme.muted, lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
    {data.education.length > 0 && <div style={{ marginBottom: 20 }}><div style={{ fontSize: 9, color: theme.muted, letterSpacing: 2, marginBottom: 10 }}>// EDUCATION</div>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 8, padding: "10px 14px", border: `1px solid ${theme.accent}26`, borderRadius: 6 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12, color: theme.onAccent === "#000000" ? "#fff" : theme.onAccent }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 10, color: theme.muted }}>{edu.period}</span></div><div style={{ fontSize: 11, color: theme.accent2 }}>{edu.school}{edu.gpa && ` :: IPK ${edu.gpa}`}</div></div>))}</div>}
    {data.projects.length > 0 && <div style={{ marginBottom: 20 }}><div style={{ fontSize: 9, color: theme.muted, letterSpacing: 2, marginBottom: 10 }}>// PROJECTS</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>{data.projects.map((p, i) => (<div key={i} style={{ padding: "12px 14px", border: `1px solid ${theme.accent}33`, borderRadius: 6, background: `${theme.accent}08` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><strong style={{ fontSize: 12, color: theme.accent }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent2 }}>↗</a>}</div>{p.description && <p style={{ fontSize: 10, color: theme.muted, margin: "0 0 4px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 9, color: theme.accent2, margin: 0 }}>{p.tech}</p>}</div>))}</div></div>}
    <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent2} textColor={theme.muted} titleColor={theme.muted} dark />
  </div>
);
export const NEON_THEME = { accent: "#00ff88", accent2: "#00d4ff", bg: "#000000", surface: "rgba(0,255,136,0.04)", text: "#00ff88", muted: "rgba(0,255,136,0.5)", onAccent: "#000000" };

/* ════════════════════════ 7. Decorative Banner (Sunset) ════════════════════════ */
export const DecorativeBannerTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || "Verdana,sans-serif", background: theme.bg, color: theme.text }}>
    <div style={{ background: `linear-gradient(135deg,${theme.accent} 0%,${theme.accent2} 100%)`, padding: "36px 40px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
      <div style={{ position: "absolute", bottom: -20, left: 60, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 20, position: "relative" }}>
        <PhotoOrInitial photo={data.photo} name={data.name} size={84} bgFrom="rgba(255,255,255,0.3)" bgTo="rgba(255,255,255,0.15)" border="3px solid rgba(255,255,255,0.6)" shadow="0 4px 20px rgba(0,0,0,0.25)" />
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", color: theme.onAccent }}>{data.name || "Nama Lengkap"}</h1>
          <p style={{ fontSize: 13, color: `${theme.onAccent}d9`, margin: "0 0 12px", fontWeight: 600 }}>{data.title || "Jabatan / Role"}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 14px", fontSize: 11, color: `${theme.onAccent}b3` }}>{data.location && <span>📍 {data.location}</span>}{data.email && <span>✉ {data.email}</span>}{data.phone && <span>📞 {data.phone}</span>}{data.website && <span>🌐 {data.website}</span>}</div>
        </div>
      </div>
    </div>
    <div style={{ padding: "28px 40px" }}>
      {data.bio && <div style={{ marginBottom: 22, padding: "16px 20px", background: theme.surface, borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", borderLeft: `4px solid ${theme.accent}` }}><SectionTitle color={theme.accent}>Tentang Saya</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.8, color: theme.muted, margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
      {data.skills.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accent2}>Keahlian</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "5px 14px", borderRadius: 20, background: i % 2 === 0 ? `${theme.accent}1f` : `${theme.accent2}1f`, color: i % 2 === 0 ? theme.accent : theme.accent2, fontWeight: 600 }}>{s}</span>)}</div></div>}
      {data.experience.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accent2}>Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 14, padding: "14px 18px", background: theme.surface, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderTop: `3px solid ${i % 2 === 0 ? theme.accent : theme.accent2}` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><strong style={{ fontSize: 13, color: theme.text }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 10, color: theme.onAccent, background: `linear-gradient(to right,${theme.accent},${theme.accent2})`, padding: "2px 10px", borderRadius: 10 }}>{exp.period}</span></div><div style={{ fontSize: 11, color: theme.accent2, fontWeight: 600, marginBottom: 3 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: theme.muted, lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
      {data.education.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accent2}>Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 10, padding: "12px 16px", background: theme.surface, borderRadius: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12, color: theme.text }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 10, color: theme.accent2 }}>{edu.period}</span></div><div style={{ fontSize: 11, color: theme.accent }}>{edu.school}{edu.gpa && ` · IPK ${edu.gpa}`}</div></div>))}</div>}
      {data.projects.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accent2}>Proyek</SectionTitle><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{data.projects.map((p, i) => (<div key={i} style={{ padding: "14px", background: theme.surface, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderBottom: `3px solid ${i % 2 === 0 ? theme.accent : theme.accent2}` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><strong style={{ fontSize: 12, color: theme.text }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent2 }}>↗</a>}</div>{p.description && <p style={{ fontSize: 10, color: theme.muted, margin: "0 0 4px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 9, color: theme.accent, margin: 0, fontWeight: 600 }}>{p.tech}</p>}</div>))}</div></div>}
      <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent2} textColor={theme.muted} titleColor={theme.accent2} />
    </div>
  </div>
);
export const SUNSET_THEME = { accent: "#ea580c", accent2: "#9333ea", bg: "#fff7ed", surface: "#ffffff", text: "#1c1917", muted: "#6b7280", onAccent: "#ffffff" };

/* ════════════════════════ 8. Solid Banner + Cards (Forest) ════════════════════════ */
export const SolidBannerCardsTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || "Georgia,serif", background: theme.bg, color: theme.text }}>
    <div style={{ background: `linear-gradient(135deg,${theme.accent2},${theme.accent})`, padding: "32px 40px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px", color: theme.onAccent }}>{data.name || "Nama Lengkap"}</h1>
      <p style={{ fontSize: 13, color: `${theme.onAccent}cc`, margin: "0 0 12px", fontStyle: "italic" }}>{data.title || "Jabatan / Role"}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 16px", fontSize: 11, color: `${theme.onAccent}b3` }}>{data.location && <span>📍 {data.location}</span>}{data.email && <span>✉ {data.email}</span>}{data.phone && <span>📞 {data.phone}</span>}{data.website && <span>🌐 {data.website}</span>}{data.linkedin && <span>in {data.linkedin}</span>}{data.github && <span>⌥ {data.github}</span>}</div>
    </div>
    <div style={{ padding: "28px 40px" }}>
      {data.bio && <div style={{ marginBottom: 22, padding: "16px 20px", background: theme.surface, borderRadius: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: `1px solid ${theme.accent}33` }}><SectionTitle color={theme.accent2}>Profil</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.8, color: theme.muted, margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
      {data.skills.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accent2}>Keahlian</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 6, background: `${theme.accent}15`, border: `1px solid ${theme.accent}40`, color: theme.accent2, fontWeight: 500 }}>{s}</span>)}</div></div>}
      {data.experience.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accent2}>Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 14, padding: "14px 18px", background: theme.surface, borderRadius: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", borderLeft: `4px solid ${theme.accent}` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><strong style={{ fontSize: 13 }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 10, color: theme.accent2, background: `${theme.accent}15`, padding: "2px 8px", borderRadius: 10 }}>{exp.period}</span></div><div style={{ fontSize: 11, color: theme.accent, fontWeight: 600, marginBottom: 3 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: theme.muted, lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
      {data.education.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accent2}>Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 10, padding: "12px 16px", background: theme.surface, borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12 }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 10, color: theme.accent }}>{edu.period}</span></div><div style={{ fontSize: 11, color: theme.accent2 }}>{edu.school}{edu.gpa && ` · IPK ${edu.gpa}`}</div></div>))}</div>}
      {data.projects.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accent2}>Proyek</SectionTitle>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 10, padding: "12px 16px", background: theme.surface, borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${theme.accent}33` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><strong style={{ fontSize: 12 }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent }}>↗</a>}</div>{p.description && <p style={{ fontSize: 11, color: theme.muted, margin: "0 0 3px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 10, color: theme.accent, margin: 0 }}>{p.tech}</p>}</div>))}</div>}
      <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent2} textColor={theme.muted} titleColor={theme.accent2} />
    </div>
  </div>
);
export const FOREST_THEME = { accent: "#22c55e", accent2: "#166534", bg: "#f0fdf4", surface: "#ffffff", text: "#14532d", muted: "#6b7280", onAccent: "#ffffff" };

/* ════════════════════════ 9. Compact Header (Aurora) ════════════════════════ */
export const CompactHeaderTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || "Arial,sans-serif", background: `linear-gradient(135deg,${theme.bg},${theme.accent2})`, color: theme.text, height: "100%" }}>
    <div style={{ padding: "32px 40px", background: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
        <PhotoOrInitial photo={data.photo} name={data.name} size={64} bgFrom={theme.accent} bgTo={theme.accent2} border="2px solid rgba(255,255,255,0.2)" shadow="0 4px 12px rgba(0,0,0,0.3)" />
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: theme.onAccent }}>{data.name || "Nama Lengkap"}</h1>
          <p style={{ fontSize: 14, color: theme.accent, margin: "4px 0 0" }}>{data.title || "Jabatan / Role"}</p>
        </div>
      </div>
      <ContactRow items={data} color={theme.muted} fontSize={11} />
    </div>
    <div style={{ padding: "0 40px 32px" }}>
      {data.bio && <div style={{ marginBottom: 24, background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: 16 }}><SectionTitle color={theme.accent} style={{ marginBottom: 8 }}>Tentang Saya</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.8, color: theme.muted, margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
      {data.skills.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accent}>Keahlian</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 9999, background: `${theme.accent}26`, border: `1px solid ${theme.accent}`, color: theme.text }}>{s}</span>)}</div></div>}
      {data.experience.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accent}>Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 16, background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.1)" }}><strong style={{ fontSize: 13, color: theme.onAccent, display: "block" }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 11, color: theme.accent }}>{exp.company} · {exp.period}</span>{exp.description && <p style={{ fontSize: 11, color: theme.muted, marginTop: 8, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
      {data.education.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accent}>Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 12 }}><strong style={{ fontSize: 13, color: theme.onAccent }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 12, color: theme.accent, display: "block" }}>{edu.school} · {edu.period}{edu.gpa && ` (IPK ${edu.gpa})`}</span></div>))}</div>}
      {data.projects.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accent}>Proyek</SectionTitle>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 12 }}><strong style={{ fontSize: 13, color: theme.onAccent }}>{p.name || "Proyek"}</strong>{p.description && <p style={{ fontSize: 11, color: theme.muted, margin: "4px 0", textAlign: "justify" }}>{p.description}</p>}{p.tech && <span style={{ fontSize: 10, color: theme.accent }}>{p.tech}</span>}{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent, display: "block" }}>↗ Link</a>}</div>))}</div>}
      <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent} textColor={theme.muted} titleColor={theme.accent} dark />
    </div>
  </div>
);
export const AURORA_THEME = { accent: "#a78bfa", accent2: "#1e3a8a", bg: "#4c1d95", surface: "rgba(255,255,255,0.05)", text: "#e0f2fe", muted: "#bfdbfe", onAccent: "#ffffff" };

/* ════════════════════════ 10. Magazine (Retro) ════════════════════════ */
export const MagazineTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || "'Courier New',monospace", background: theme.bg, color: theme.text, padding: "36px 44px" }}>
    <div style={{ textAlign: "center", borderBottom: `4px double ${theme.accent}`, borderTop: `4px double ${theme.accent}`, padding: "12px 0", marginBottom: 20 }}>
      <div style={{ fontSize: 9, letterSpacing: 4, color: theme.accent, marginBottom: 4, textTransform: "uppercase" }}>— Curriculum Vitae —</div>
      <h1 style={{ fontSize: 30, fontWeight: 900, margin: "0 0 4px", letterSpacing: "1px", color: theme.text, textTransform: "uppercase" }}>{data.name || "NAMA LENGKAP"}</h1>
      <div style={{ fontSize: 12, color: theme.accent, fontStyle: "italic", marginBottom: 6 }}>{data.title || "Jabatan / Role"}</div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 20px", fontSize: 10, color: theme.muted }}>{data.email && <span>✉ {data.email}</span>}{data.phone && <span>✆ {data.phone}</span>}{data.location && <span>⚑ {data.location}</span>}{data.website && <span>⚇ {data.website}</span>}</div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "0 28px" }}>
      <div>
        {data.bio && <div style={{ marginBottom: 18 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: theme.accent, borderBottom: `2px solid ${theme.accent}`, paddingBottom: 4, marginBottom: 8 }}>◆ Profil</div><p style={{ fontSize: 12, lineHeight: 1.9, color: theme.text, textAlign: "justify", margin: 0, textIndent: 16 }}>{data.bio}</p></div>}
        {data.experience.length > 0 && <div style={{ marginBottom: 18 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: theme.accent, borderBottom: `2px solid ${theme.accent}`, paddingBottom: 4, marginBottom: 10 }}>◆ Pengalaman</div>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: `1px dashed ${theme.muted}` }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12 }}>{exp.role || "Posisi"}</strong><em style={{ fontSize: 10, color: theme.accent }}>{exp.period}</em></div><div style={{ fontSize: 11, color: theme.accent, marginBottom: 2, fontStyle: "italic" }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: theme.text, lineHeight: 1.7, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
        {data.projects.length > 0 && <div><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: theme.accent, borderBottom: `2px solid ${theme.accent}`, paddingBottom: 4, marginBottom: 10 }}>◆ Proyek</div>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: `1px dashed ${theme.muted}` }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12 }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent }}>↗</a>}</div>{p.description && <p style={{ fontSize: 11, color: theme.text, margin: "2px 0", lineHeight: 1.6, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 10, color: theme.accent, margin: 0, fontStyle: "italic" }}>Tech: {p.tech}</p>}</div>))}</div>}
        <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent} textColor={theme.text} titleColor={theme.accent} />
      </div>
      <div style={{ borderLeft: `2px solid ${theme.accent}`, paddingLeft: 20 }}>
        {data.skills.length > 0 && <div style={{ marginBottom: 18 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: theme.accent, borderBottom: `2px solid ${theme.accent}`, paddingBottom: 4, marginBottom: 8 }}>◆ Keahlian</div><div style={{ display: "flex", flexDirection: "column", gap: 4 }}>{data.skills.map((s, i) => <div key={i} style={{ fontSize: 11, color: theme.text, paddingLeft: 8, borderLeft: `2px solid ${theme.accent}` }}>· {s}</div>)}</div></div>}
        {data.education.length > 0 && <div style={{ marginBottom: 18 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: theme.accent, borderBottom: `2px solid ${theme.accent}`, paddingBottom: 4, marginBottom: 8 }}>◆ Pendidikan</div>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 10 }}><strong style={{ fontSize: 11, color: theme.text }}>{edu.degree || "Gelar"}</strong><div style={{ fontSize: 10, color: theme.accent, fontStyle: "italic" }}>{edu.school}</div><div style={{ fontSize: 10, color: theme.muted }}>{edu.period}{edu.gpa && ` · IPK ${edu.gpa}`}</div></div>))}</div>}
        {(data.linkedin || data.github) && <div><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: theme.accent, borderBottom: `2px solid ${theme.accent}`, paddingBottom: 4, marginBottom: 8 }}>◆ Tautan</div>{data.linkedin && <div style={{ fontSize: 10, color: theme.text, marginBottom: 4 }}>in {data.linkedin}</div>}{data.github && <div style={{ fontSize: 10, color: theme.text }}>⌥ {data.github}</div>}</div>}
      </div>
    </div>
    <div style={{ textAlign: "center", marginTop: 24, fontSize: 9, color: theme.accent, borderTop: `2px double ${theme.accent}`, paddingTop: 8, letterSpacing: 3 }}>— END — · {data.name || "CURRICULUM VITAE"} —</div>
  </div>
);
export const RETRO_THEME = { accent: "#92400e", accent2: "#d97706", bg: "#fef9c3", surface: "#fef9c3", text: "#451a03", muted: "#78350f", onAccent: "#ffffff" };

/* ════════════════════════ 11. Icon Sidebar (BARU) ════════════════════════
 * Terinspirasi referensi: foto bundar di sidebar gelap, baris kontak/
 * pendidikan dengan icon kecil, label section bertitik dua warna.        */
export const IconSidebarTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || "Georgia,serif", display: "flex", color: theme.text, minHeight: 1123, background: theme.bg }}>
    <div style={{ width: 230, flexShrink: 0, background: theme.accent2, color: theme.onAccent, padding: "36px 26px" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <PhotoOrInitial photo={data.photo} name={data.name} size={96} bgFrom={theme.accent} bgTo={theme.accent2} border={`4px solid ${theme.accent}`} />
      </div>
      <h1 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 2px", textAlign: "center" }}>{data.name || "Nama Lengkap"}</h1>
      <p style={{ fontSize: 11, color: theme.accent, margin: "0 0 24px", textAlign: "center", textTransform: "uppercase", letterSpacing: 1 }}>{data.title || "Jabatan / Role"}</p>

      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <div style={{ width: 16, height: 1.5, background: theme.accent }} />
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: theme.accent }}>Kontak</span>
        </div>
        <IconRow data={data} color={theme.onAccent} iconColor={theme.accent} fontSize={10} />
      </div>

      {data.education.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            <div style={{ width: 16, height: 1.5, background: theme.accent }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: theme.accent }}>Pendidikan</span>
          </div>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600 }}>{edu.degree || "Gelar"}</div>
              <div style={{ fontSize: 10, color: `${theme.onAccent}b3` }}>{edu.school}</div>
              <div style={{ fontSize: 9, color: theme.accent }}>{edu.period}{edu.gpa && ` · ${edu.gpa}`}</div>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            <div style={{ width: 16, height: 1.5, background: theme.accent }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: theme.accent }}>Keahlian</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {data.skills.map((s, i) => (
              <span key={i} style={{ fontSize: 9.5, padding: "3px 9px", borderRadius: 3, border: `1px solid ${theme.accent}`, color: theme.onAccent }}>{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>

    <div style={{ flex: 1, padding: "36px 34px", background: theme.bg }}>
      {data.bio && (
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: theme.accent2 }}>Profil</span>
            <div style={{ flex: 1, height: 1, background: `${theme.accent2}30` }} />
          </div>
          <p style={{ fontSize: 12, lineHeight: 1.8, color: theme.muted, margin: 0, textAlign: "justify" }}>{data.bio}</p>
        </div>
      )}
      {data.experience.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: theme.accent2 }}>Pengalaman</span>
            <div style={{ flex: 1, height: 1, background: `${theme.accent2}30` }} />
          </div>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 13, color: theme.text }}>{exp.role || "Posisi"}</strong>
                <span style={{ fontSize: 10.5, color: theme.accent2, fontWeight: 600 }}>{exp.period}</span>
              </div>
              <div style={{ fontSize: 11.5, color: theme.accent, fontWeight: 600, marginBottom: 3 }}>{exp.company}</div>
              {exp.description && <p style={{ fontSize: 11, color: theme.muted, lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}
      {data.projects.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: theme.accent2 }}>Proyek</span>
            <div style={{ flex: 1, height: 1, background: `${theme.accent2}30` }} />
          </div>
          {data.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 12.5 }}>{p.name || "Proyek"}</strong>
                {p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent2 }}>↗</a>}
              </div>
              {p.description && <p style={{ fontSize: 11, color: theme.muted, margin: "2px 0", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}
              {p.tech && <p style={{ fontSize: 10, color: theme.accent2, margin: 0 }}>{p.tech}</p>}
            </div>
          ))}
        </div>
      )}
      <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent2} textColor={theme.muted} titleColor={theme.accent2} />
    </div>
  </div>
);
export const ICON_SIDEBAR_THEME = { accent: "#d4af37", accent2: "#1e3a5f", bg: "#ffffff", surface: "#ffffff", text: "#1e293b", muted: "#64748b", onAccent: "#ffffff" };

/* ════════════════════════ 12. Photo Banner Gelap (BARU) ════════════════════════
 * Terinspirasi referensi: foto besar jadi banner gelap penuh di atas,
 * nama & jabatan overlay di foto, konten bersih di bawah.                */
export const PhotoBannerTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || "Arial,sans-serif", background: theme.bg, color: theme.text }}>
    <div style={{ position: "relative", background: `linear-gradient(135deg,${theme.accent2},#0a0a0a)`, padding: "40px 40px 36px", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 80% 20%, ${theme.accent}26, transparent 60%)` }} />
      <div style={{ display: "flex", alignItems: "center", gap: 24, position: "relative" }}>
        <PhotoOrInitial photo={data.photo} name={data.name} size={104} bgFrom={theme.accent} bgTo={theme.accent2} border={`3px solid ${theme.accent}`} shadow="0 8px 24px rgba(0,0,0,0.4)" />
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 800, margin: "0 0 4px", color: "#fff", letterSpacing: "-0.5px" }}>{data.name || "Nama Lengkap"}</h1>
          <p style={{ fontSize: 14, color: theme.accent, margin: "0 0 14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{data.title || "Jabatan / Role"}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", fontSize: 11, color: "rgba(255,255,255,0.75)" }}>
            {data.email && <span>✉ {data.email}</span>}
            {data.phone && <span>📞 {data.phone}</span>}
            {data.location && <span>📍 {data.location}</span>}
            {data.website && <span>🌐 {data.website}</span>}
          </div>
        </div>
      </div>
    </div>
    <div style={{ padding: "30px 40px", display: "grid", gridTemplateColumns: "2fr 1fr", gap: 28 }}>
      <div>
        {data.bio && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accent2}>Profil</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.8, color: theme.muted, margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
        {data.experience.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accent2}>Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < data.experience.length - 1 ? `1px solid ${theme.accent2}20` : "none" }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13 }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 10.5, color: theme.accent2, fontWeight: 600 }}>{exp.period}</span></div><div style={{ fontSize: 11.5, color: theme.accent, fontWeight: 600, marginBottom: 3 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: theme.muted, lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
        {data.projects.length > 0 && <div><SectionTitle color={theme.accent2}>Proyek</SectionTitle>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12.5 }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent2 }}>↗</a>}</div>{p.description && <p style={{ fontSize: 11, color: theme.muted, margin: "2px 0", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 10, color: theme.accent2, margin: 0 }}>{p.tech}</p>}</div>))}</div>}
      </div>
      <div>
        {data.skills.length > 0 && (
          <div style={{ marginBottom: 22 }}>
            <SectionTitle color={theme.accent2}>Keahlian</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {data.skills.map((s, i) => (
                <div key={i} style={{ fontSize: 11, padding: "5px 10px", background: theme.surface, borderRadius: 6, color: theme.text, borderLeft: `3px solid ${theme.accent}` }}>{s}</div>
              ))}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div>
            <SectionTitle color={theme.accent2}>Pendidikan</SectionTitle>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11.5, fontWeight: 600 }}>{edu.degree || "Gelar"}</div>
                <div style={{ fontSize: 10.5, color: theme.accent }}>{edu.school}</div>
                <div style={{ fontSize: 10, color: theme.muted }}>{edu.period}{edu.gpa && ` · ${edu.gpa}`}</div>
              </div>
            ))}
          </div>
        )}
        <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent2} textColor={theme.muted} titleColor={theme.accent2} />
      </div>
    </div>
  </div>
);
export const PHOTO_BANNER_THEME = { accent: "#d4af37", accent2: "#1f2937", bg: "#ffffff", surface: "#f8fafc", text: "#1e293b", muted: "#64748b", onAccent: "#ffffff" };

/* ════════════════════════ 13. Clean ATS (BARU) ════════════════════════
 * Terinspirasi referensi: foto kecil + nama, sangat bersih, tanpa kotak/
 * warna mencolok, garis pembatas tipis -- ramah ATS.                    */
export const CleanATSTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || "Georgia,serif", background: theme.bg, color: theme.text, padding: "44px 50px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${theme.text}1a` }}>
      <PhotoOrInitial photo={data.photo} name={data.name} size={64} bgFrom={theme.accent} bgTo={theme.accent2} radius="8px" />
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 2px", letterSpacing: "-0.3px" }}>{data.name || "Nama Lengkap"}</h1>
        <p style={{ fontSize: 13, color: theme.accent, margin: 0, fontWeight: 500 }}>{data.title || "Jabatan / Role"}</p>
      </div>
    </div>
    <ContactRow items={data} color={theme.muted} fontSize={11} />
    <div style={{ height: 20 }} />
    {data.bio && <div style={{ marginBottom: 22 }}><h2 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: theme.text, margin: "0 0 8px", paddingBottom: 4, borderBottom: `1px solid ${theme.text}1a` }}>Profil</h2><p style={{ fontSize: 12, lineHeight: 1.75, color: theme.muted, margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
    {data.experience.length > 0 && <div style={{ marginBottom: 22 }}><h2 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: theme.text, margin: "0 0 10px", paddingBottom: 4, borderBottom: `1px solid ${theme.text}1a` }}>Pengalaman Kerja</h2>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 14 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13 }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 11, color: theme.muted }}>{exp.period}</span></div><div style={{ fontSize: 12, color: theme.accent, marginBottom: 3 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11.5, color: theme.muted, lineHeight: 1.7, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
    {data.education.length > 0 && <div style={{ marginBottom: 22 }}><h2 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: theme.text, margin: "0 0 10px", paddingBottom: 4, borderBottom: `1px solid ${theme.text}1a` }}>Pendidikan</h2>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12.5 }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 11, color: theme.muted }}>{edu.period}</span></div><div style={{ fontSize: 11.5, color: theme.accent }}>{edu.school}{edu.gpa && ` · IPK ${edu.gpa}`}</div></div>))}</div>}
    {data.skills.length > 0 && <div style={{ marginBottom: 22 }}><h2 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: theme.text, margin: "0 0 8px", paddingBottom: 4, borderBottom: `1px solid ${theme.text}1a` }}>Keahlian</h2><p style={{ fontSize: 12, color: theme.muted, margin: 0 }}>{data.skills.join("  ·  ")}</p></div>}
    {data.projects.length > 0 && <div><h2 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: theme.text, margin: "0 0 10px", paddingBottom: 4, borderBottom: `1px solid ${theme.text}1a` }}>Proyek</h2>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 8 }}><strong style={{ fontSize: 12.5 }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent, marginLeft: 6 }}>↗</a>}{p.description && <p style={{ fontSize: 11.5, color: theme.muted, margin: "2px 0 0", lineHeight: 1.6, textAlign: "justify" }}>{p.description}</p>}</div>))}</div>}
    <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent} textColor={theme.muted} titleColor={theme.text} />
  </div>
);
export const CLEAN_ATS_THEME = { accent: "#475569", accent2: "#94a3b8", bg: "#ffffff", surface: "#ffffff", text: "#0f172a", muted: "#475569", onAccent: "#ffffff" };

/* ════════════════════════ 14. Bold Photo Top (BARU) ════════════════════════
 * Terinspirasi referensi: foto besar di tengah/kiri atas, nama besar &
 * tebal, sans-serif modern, aksen warna minimal.                        */
export const BoldPhotoTopTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || "Arial,sans-serif", background: theme.bg, color: theme.text, padding: "40px 44px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
      <div style={{ maxWidth: "65%" }}>
        <h1 style={{ fontSize: 34, fontWeight: 900, margin: "0 0 4px", letterSpacing: "-1px", lineHeight: 1.05 }}>{data.name || "Nama Lengkap"}</h1>
        <p style={{ fontSize: 15, color: theme.accent, margin: "0 0 14px", fontWeight: 700 }}>{data.title || "Jabatan / Role"}</p>
        <ContactRow items={data} color={theme.muted} fontSize={11} />
      </div>
      <PhotoOrInitial photo={data.photo} name={data.name} size={92} bgFrom={theme.accent} bgTo={theme.accent2} border={`3px solid ${theme.accent}`} />
    </div>
    <div style={{ height: 3, background: theme.accent, width: 48, marginBottom: 24 }} />
    {data.bio && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.text} style={{ fontSize: 11 }}>Profil</SectionTitle><p style={{ fontSize: 12.5, lineHeight: 1.8, color: theme.muted, margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
    <div style={{ display: "grid", gridTemplateColumns: data.skills.length > 0 ? "2fr 1fr" : "1fr", gap: 28 }}>
      <div>
        {data.experience.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.text} style={{ fontSize: 11 }}>Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 16 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13.5 }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 11, color: theme.accent, fontWeight: 700 }}>{exp.period}</span></div><div style={{ fontSize: 12, color: theme.muted, fontWeight: 600, marginBottom: 4 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11.5, color: theme.muted, lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
        {data.projects.length > 0 && <div><SectionTitle color={theme.text} style={{ fontSize: 11 }}>Proyek</SectionTitle>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13 }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent }}>↗</a>}</div>{p.description && <p style={{ fontSize: 11.5, color: theme.muted, margin: "2px 0", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 10, color: theme.accent, margin: 0, fontWeight: 600 }}>{p.tech}</p>}</div>))}</div>}
      </div>
      <div>
        {data.skills.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <SectionTitle color={theme.text} style={{ fontSize: 11 }}>Keahlian</SectionTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 11px", borderRadius: 999, background: theme.text, color: theme.bg, fontWeight: 600 }}>{s}</span>)}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div>
            <SectionTitle color={theme.text} style={{ fontSize: 11 }}>Pendidikan</SectionTitle>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{edu.degree || "Gelar"}</div>
                <div style={{ fontSize: 11, color: theme.muted }}>{edu.school}</div>
                <div style={{ fontSize: 10.5, color: theme.accent, fontWeight: 600 }}>{edu.period}{edu.gpa && ` · ${edu.gpa}`}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent} textColor={theme.muted} titleColor={theme.text} />
  </div>
);
export const BOLD_PHOTO_TOP_THEME = { accent: "#dc2626", accent2: "#1e293b", bg: "#ffffff", surface: "#f8fafc", text: "#0f172a", muted: "#64748b", onAccent: "#ffffff" };

/* ════════════════════════ 15. Pastel Band (BARU) ════════════════════════
 * Terinspirasi referensi: header band pastel/colorful, dua kolom rapi
 * di bawahnya.                                                          */
export const PastelBandTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || "Verdana,sans-serif", background: theme.bg, color: theme.text }}>
    <div style={{ background: `linear-gradient(120deg,${theme.accent}33,${theme.accent2}33)`, padding: "30px 40px", display: "flex", alignItems: "center", gap: 18, borderBottom: `3px solid ${theme.accent}` }}>
      <PhotoOrInitial photo={data.photo} name={data.name} size={72} bgFrom={theme.accent} bgTo={theme.accent2} border="3px solid white" shadow="0 2px 10px rgba(0,0,0,0.1)" />
      <div>
        <h1 style={{ fontSize: 25, fontWeight: 800, margin: "0 0 3px", color: theme.text }}>{data.name || "Nama Lengkap"}</h1>
        <p style={{ fontSize: 13, color: theme.accent2, margin: "0 0 8px", fontWeight: 600 }}>{data.title || "Jabatan / Role"}</p>
        <ContactRow items={data} color={theme.muted} fontSize={10.5} />
      </div>
    </div>
    <div style={{ padding: "26px 40px", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 26 }}>
      <div>
        {data.skills.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <SectionTitle color={theme.accent2}>Keahlian</SectionTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {data.skills.map((s, i) => (
                <span key={i} style={{ fontSize: 10.5, padding: "4px 10px", borderRadius: 8, background: i % 2 === 0 ? `${theme.accent}26` : `${theme.accent2}26`, color: i % 2 === 0 ? theme.accent : theme.accent2, fontWeight: 600 }}>{s}</span>
              ))}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <SectionTitle color={theme.accent2}>Pendidikan</SectionTitle>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 10, paddingLeft: 10, borderLeft: `3px solid ${theme.accent}` }}>
                <div style={{ fontSize: 11.5, fontWeight: 700 }}>{edu.degree || "Gelar"}</div>
                <div style={{ fontSize: 10.5, color: theme.muted }}>{edu.school}</div>
                <div style={{ fontSize: 10, color: theme.accent }}>{edu.period}{edu.gpa && ` · ${edu.gpa}`}</div>
              </div>
            ))}
          </div>
        )}
        <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent2} textColor={theme.muted} titleColor={theme.accent2} />
      </div>
      <div>
        {data.bio && <div style={{ marginBottom: 20 }}><SectionTitle color={theme.accent2}>Profil</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.8, color: theme.muted, margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
        {data.experience.length > 0 && <div style={{ marginBottom: 20 }}><SectionTitle color={theme.accent2}>Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 14, padding: "12px 14px", background: theme.surface, borderRadius: 10, borderTop: `3px solid ${i % 2 === 0 ? theme.accent : theme.accent2}` }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12.5 }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 10, color: theme.muted }}>{exp.period}</span></div><div style={{ fontSize: 11, color: theme.accent2, marginBottom: 3 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: theme.muted, lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
        {data.projects.length > 0 && <div><SectionTitle color={theme.accent2}>Proyek</SectionTitle>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12 }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent2 }}>↗</a>}</div>{p.description && <p style={{ fontSize: 11, color: theme.muted, margin: "2px 0", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}</div>))}</div>}
      </div>
    </div>
  </div>
);
export const PASTEL_BAND_THEME = { accent: "#f472b6", accent2: "#60a5fa", bg: "#ffffff", surface: "#f8fafc", text: "#1e293b", muted: "#64748b", onAccent: "#ffffff" };

/* ════════════════════════ 16. Line Divider Minimalis (BARU) ════════════════════════
 * Terinspirasi referensi: tanpa kotak/warna sama sekali, hanya garis
 * tipis sebagai pembatas, tipografi serif elegan dengan whitespace luas. */
export const LineDividerTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || "'Times New Roman',serif", background: theme.bg, color: theme.text, padding: "52px 58px" }}>
    <div style={{ textAlign: "center", marginBottom: 30 }}>
      <h1 style={{ fontSize: 32, fontWeight: 400, margin: "0 0 6px", letterSpacing: "2px", textTransform: "uppercase" }}>{data.name || "Nama Lengkap"}</h1>
      <div style={{ width: 60, height: 1, background: theme.accent, margin: "0 auto 10px" }} />
      <p style={{ fontSize: 13, color: theme.muted, margin: "0 0 12px", letterSpacing: 1, fontStyle: "italic" }}>{data.title || "Jabatan / Role"}</p>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "2px 18px", fontSize: 11, color: theme.muted }}>
        {data.email && <span>{data.email}</span>}
        {data.phone && <span>{data.phone}</span>}
        {data.location && <span>{data.location}</span>}
        {data.website && <span>{data.website}</span>}
      </div>
    </div>

    {data.bio && (
      <div style={{ marginBottom: 26, textAlign: "center" }}>
        <p style={{ fontSize: 12.5, lineHeight: 1.9, color: theme.text, margin: "0 auto", maxWidth: 560, textAlign: "justify" }}>{data.bio}</p>
      </div>
    )}

    {data.experience.length > 0 && (
      <div style={{ marginBottom: 26 }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: theme.accent }}>Pengalaman</span>
          <div style={{ width: 32, height: 1, background: theme.accent, margin: "8px auto 0" }} />
        </div>
        {data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: i < data.experience.length - 1 ? `1px solid ${theme.text}14` : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ fontSize: 13.5, fontWeight: 600 }}>{exp.role || "Posisi"}</strong>
              <span style={{ fontSize: 11, color: theme.muted, fontStyle: "italic" }}>{exp.period}</span>
            </div>
            <div style={{ fontSize: 12, color: theme.muted, fontStyle: "italic", marginBottom: 4 }}>{exp.company}</div>
            {exp.description && <p style={{ fontSize: 11.5, color: theme.text, lineHeight: 1.7, margin: 0, textAlign: "justify" }}>{exp.description}</p>}
          </div>
        ))}
      </div>
    )}

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
      {data.education.length > 0 && (
        <div>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: theme.accent }}>Pendidikan</span>
            <div style={{ width: 32, height: 1, background: theme.accent, marginTop: 8 }} />
          </div>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <strong style={{ fontSize: 12.5 }}>{edu.degree || "Gelar"}</strong>
              <div style={{ fontSize: 11.5, color: theme.muted, fontStyle: "italic" }}>{edu.school}</div>
              <div style={{ fontSize: 10.5, color: theme.muted }}>{edu.period}{edu.gpa && ` · IPK ${edu.gpa}`}</div>
            </div>
          ))}
        </div>
      )}
      {data.skills.length > 0 && (
        <div>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: theme.accent }}>Keahlian</span>
            <div style={{ width: 32, height: 1, background: theme.accent, marginTop: 8 }} />
          </div>
          <p style={{ fontSize: 12, color: theme.text, lineHeight: 1.8, margin: 0 }}>{data.skills.join(" · ")}</p>
        </div>
      )}
    </div>

    {data.projects.length > 0 && (
      <div style={{ marginTop: 26 }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: theme.accent }}>Proyek</span>
          <div style={{ width: 32, height: 1, background: theme.accent, marginTop: 8 }} />
        </div>
        {data.projects.map((p, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <strong style={{ fontSize: 12.5 }}>{p.name || "Proyek"}</strong>
            {p.description && <p style={{ fontSize: 11.5, color: theme.text, margin: "2px 0", lineHeight: 1.6, textAlign: "justify" }}>{p.description}</p>}
          </div>
        ))}
      </div>
    )}
    <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent} textColor={theme.text} titleColor={theme.accent} />
  </div>
);
export const LINE_DIVIDER_THEME = { accent: "#78716c", accent2: "#a8a29e", bg: "#ffffff", surface: "#ffffff", text: "#292524", muted: "#78716c", onAccent: "#ffffff" };

/* ════════════════════════ 17. Compact Executive (BARU) ════════════════════════
 * Layout 2-kolom padat untuk profesional senior dengan banyak riwayat
 * kerja -- ringkas, profesional, tetap mudah dibaca.                    */
export const CompactExecutiveTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || "Cambria,serif", background: theme.bg, color: theme.text, padding: "34px 38px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, marginBottom: 16, borderBottom: `2px solid ${theme.accent}` }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 2px" }}>{data.name || "Nama Lengkap"}</h1>
        <p style={{ fontSize: 12, color: theme.accent, margin: 0, fontWeight: 600 }}>{data.title || "Jabatan / Role"}</p>
      </div>
      <div style={{ textAlign: "right", fontSize: 10, color: theme.muted, lineHeight: 1.5 }}>
        {data.email && <div>{data.email}</div>}
        {data.phone && <div>{data.phone}</div>}
        {data.location && <div>{data.location}</div>}
      </div>
    </div>

    {data.bio && <p style={{ fontSize: 11, lineHeight: 1.6, color: theme.muted, margin: "0 0 16px", textAlign: "justify" }}>{data.bio}</p>}

    <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr", gap: 22 }}>
      <div>
        {data.experience.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: theme.accent, margin: "0 0 8px" }}>Pengalaman Kerja</h2>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: i < data.experience.length - 1 ? `1px solid ${theme.text}10` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong style={{ fontSize: 11.5 }}>{exp.role || "Posisi"} <span style={{ fontWeight: 400, color: theme.muted }}>— {exp.company}</span></strong>
                  <span style={{ fontSize: 10, color: theme.accent, whiteSpace: "nowrap", marginLeft: 8 }}>{exp.period}</span>
                </div>
                {exp.description && <p style={{ fontSize: 10.5, color: theme.muted, lineHeight: 1.55, margin: "3px 0 0", textAlign: "justify" }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}
        {data.projects.length > 0 && (
          <div>
            <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: theme.accent, margin: "0 0 8px" }}>Proyek</h2>
            {data.projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <strong style={{ fontSize: 11 }}>{p.name || "Proyek"}</strong>
                {p.description && <p style={{ fontSize: 10.5, color: theme.muted, margin: "2px 0 0", lineHeight: 1.55, textAlign: "justify" }}>{p.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {data.skills.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: theme.accent, margin: "0 0 8px" }}>Keahlian</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {data.skills.map((s, i) => <span key={i} style={{ fontSize: 9.5, padding: "2px 7px", background: theme.surface, border: `1px solid ${theme.accent}40`, borderRadius: 3, color: theme.text }}>{s}</span>)}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: theme.accent, margin: "0 0 8px" }}>Pendidikan</h2>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 600 }}>{edu.degree || "Gelar"}</div>
                <div style={{ fontSize: 10, color: theme.muted }}>{edu.school} · {edu.period}</div>
              </div>
            ))}
          </div>
        )}
        {(data.linkedin || data.github || data.website) && (
          <div>
            <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: theme.accent, margin: "0 0 8px" }}>Tautan</h2>
            <div style={{ fontSize: 10, color: theme.muted, lineHeight: 1.6 }}>
              {data.linkedin && <div>in {data.linkedin}</div>}
              {data.github && <div>⌥ {data.github}</div>}
              {data.website && <div>🌐 {data.website}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
    <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent} textColor={theme.muted} titleColor={theme.accent} />
  </div>
);
export const COMPACT_EXECUTIVE_THEME = { accent: "#1e3a5f", accent2: "#475569", bg: "#ffffff", surface: "#f8fafc", text: "#1e293b", muted: "#64748b", onAccent: "#ffffff" };

/* ════════════════════════ TEMPLATE MAP FINAL ════════════════════════
 * Setiap entry: { Component, defaultTheme }. resolveTheme() di
 * all-templates.jsx akan menggabungkan defaultTheme ini dengan
 * data.customColors (jika user sudah kustomisasi warna) sebelum
 * dipakai merender -- baik di preview maupun PDF.                     */
export const templateRegistry = {
  minimal: { Component: BorderHeaderTemplate, theme: MINIMAL_THEME, name: "Minimalis", hasPhoto: false },
  modern: { Component: GradientBannerTemplate, theme: MODERN_THEME, name: "Modern", hasPhoto: false },
  creative: { Component: CenteredPhotoTemplate, theme: CREATIVE_THEME, name: "Kreatif", hasPhoto: true },
  professional: { Component: SidebarTemplate, theme: PROFESSIONAL_THEME, name: "Profesional", hasPhoto: true },
  elegant: { Component: DarkSerifTemplate, theme: ELEGANT_THEME, name: "Elegan", hasPhoto: false },
  neon: { Component: BoxedPhotoTemplate, theme: NEON_THEME, name: "Neon Cyber", hasPhoto: true },
  sunset: { Component: DecorativeBannerTemplate, theme: SUNSET_THEME, name: "Sunset", hasPhoto: true },
  forest: { Component: SolidBannerCardsTemplate, theme: FOREST_THEME, name: "Forest", hasPhoto: false },
  aurora: { Component: CompactHeaderTemplate, theme: AURORA_THEME, name: "Aurora", hasPhoto: true },
  retro: { Component: MagazineTemplate, theme: RETRO_THEME, name: "Retro Paper", hasPhoto: false },
  iconsidebar: { Component: IconSidebarTemplate, theme: ICON_SIDEBAR_THEME, name: "Sidebar Eksekutif", hasPhoto: true },
  photobanner: { Component: PhotoBannerTemplate, theme: PHOTO_BANNER_THEME, name: "Banner Foto", hasPhoto: true },
  cleanats: { Component: CleanATSTemplate, theme: CLEAN_ATS_THEME, name: "Clean ATS", hasPhoto: true },
  boldphototop: { Component: BoldPhotoTopTemplate, theme: BOLD_PHOTO_TOP_THEME, name: "Bold Modern", hasPhoto: true },
  pastelband: { Component: PastelBandTemplate, theme: PASTEL_BAND_THEME, name: "Pastel Band", hasPhoto: true },
  linedivider: { Component: LineDividerTemplate, theme: LINE_DIVIDER_THEME, name: "Garis Minimalis", hasPhoto: false },
  compactexecutive: { Component: CompactExecutiveTemplate, theme: COMPACT_EXECUTIVE_THEME, name: "Eksekutif Padat", hasPhoto: false },
};
