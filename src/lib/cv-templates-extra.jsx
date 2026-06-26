/*
 * 40 template tambahan, dibangun dari 10 "layout engine" yang masing-masing
 * meniru struktur salah satu dari 10 template original (Minimal, Modern,
 * Creative, Professional, Elegant, Neon, Sunset, Forest, Aurora, Retro),
 * lalu di-theme ulang dengan kombinasi warna/font yang berbeda.
 *
 * Pendekatan ini sengaja dipilih dibanding menulis 40 komponen unik dari
 * nol: satu bug fix di satu engine otomatis memperbaiki 4 template
 * sekaligus, dan karena semuanya tetap memakai helper yang SAMA
 * (PhotoOrInitial, SectionTitle, ContactRow, CustomSectionsBlock) dari
 * cv-templates.jsx, sinkronisasi preview <-> PDF tetap terjamin seperti
 * 10 template sebelumnya -- tidak ada implementasi render kedua yang
 * terpisah.
 */

import {
  PhotoOrInitial,
  SectionTitle,
  ContactRow,
  CustomSectionsBlock,
} from "@/lib/cv-templates";

/* ════════════════════════ ENGINE 1: Border Header (mirip Minimal) ════════════════════════ */
const BorderHeaderTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || theme.fontDefault, background: theme.bg, color: theme.textColor, padding: "40px 44px", height: "100%" }}>
    <div style={{ borderBottom: `2px solid ${theme.textColor}`, paddingBottom: 16, marginBottom: 20 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.5px" }}>{data.name || "Nama Lengkap"}</h1>
      <p style={{ fontSize: 14, color: theme.mutedColor, margin: "0 0 10px", fontStyle: "italic" }}>{data.title || "Jabatan / Role"}</p>
      <ContactRow items={data} color={theme.mutedColor} />
    </div>
    {data.bio && <div style={{ marginBottom: 20 }}><SectionTitle color={theme.accentColor}>Profil</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.7, color: theme.textColor, margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
    {data.skills.length > 0 && <div style={{ marginBottom: 20 }}><SectionTitle color={theme.accentColor}>Keahlian</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "3px 10px", border: `1px solid ${theme.accentColor}`, borderRadius: 4, color: theme.textColor }}>{s}</span>)}</div></div>}
    {data.experience.length > 0 && <div style={{ marginBottom: 20 }}><SectionTitle color={theme.accentColor}>Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><strong style={{ fontSize: 13 }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 11, color: theme.mutedColor }}>{exp.period}</span></div><div style={{ fontSize: 12, color: theme.accentColor, marginBottom: 2 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: theme.mutedColor, lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
    {data.education.length > 0 && <div style={{ marginBottom: 20 }}><SectionTitle color={theme.accentColor}>Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13 }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 11, color: theme.mutedColor }}>{edu.period}</span></div><div style={{ fontSize: 12, color: theme.accentColor }}>{edu.school}{edu.gpa && ` · IPK: ${edu.gpa}`}</div></div>))}</div>}
    {data.projects.length > 0 && <div style={{ marginBottom: 20 }}><SectionTitle color={theme.accentColor}>Proyek</SectionTitle>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13 }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accentColor }}>↗ Link</a>}</div>{p.description && <p style={{ fontSize: 11, color: theme.mutedColor, margin: "2px 0", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 10, color: theme.mutedColor, margin: 0 }}>{p.tech}</p>}</div>))}</div>}
    <CustomSectionsBlock sections={data.customSections} accentColor={theme.accentColor} textColor={theme.mutedColor} titleColor={theme.accentColor} />
  </div>
);

/* ════════════════════════ ENGINE 2: Gradient Banner (mirip Modern) ════════════════════════ */
const GradientBannerTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || theme.fontDefault, background: theme.bodyBg, color: theme.bodyText, height: "100%" }}>
    <div style={{ background: theme.bannerGradient, padding: "32px 40px 28px", display: "flex", alignItems: "center", gap: 18 }}>
      {theme.hasPhoto && <PhotoOrInitial photo={data.photo} name={data.name} size={68} bgFrom={theme.photoFrom} bgTo={theme.photoTo} border="2px solid rgba(255,255,255,0.4)" />}
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", color: "#fff", letterSpacing: "-0.5px" }}>{data.name || "Nama Lengkap"}</h1>
        <p style={{ fontSize: 14, color: theme.bannerTextColor, margin: "0 0 10px", fontWeight: 500 }}>{data.title || "Jabatan / Role"}</p>
        <ContactRow items={data} color={theme.bannerTextColor} fontSize={11} />
      </div>
    </div>
    <div style={{ padding: "28px 40px" }}>
      {data.bio && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accentColor}>Tentang Saya</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.8, color: theme.mutedColor, margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
      {data.skills.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accentColor}>Tech Stack</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: theme.chipBg, border: `1px solid ${theme.accentColor}`, color: theme.accentColor }}>{s}</span>)}</div></div>}
      {data.experience.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accentColor}>Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 16, background: theme.cardBg, borderRadius: 8, padding: 12, border: `1px solid ${theme.accentColor}` }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><strong style={{ fontSize: 13 }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 11, color: theme.accentColor }}>{exp.period}</span></div><div style={{ fontSize: 12, color: theme.accentColor, marginBottom: 4 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: theme.mutedColor, lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
      {data.education.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accentColor}>Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13 }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 11, color: theme.accentColor }}>{edu.period}</span></div><div style={{ fontSize: 12, color: theme.mutedColor }}>{edu.school}{edu.gpa && ` · IPK: ${edu.gpa}`}</div></div>))}</div>}
      {data.projects.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accentColor}>Proyek</SectionTitle>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13 }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accentColor }}>↗ Link</a>}</div>{p.description && <p style={{ fontSize: 11, color: theme.mutedColor, margin: "2px 0", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 10, color: theme.accentColor, margin: 0 }}>{p.tech}</p>}</div>))}</div>}
      <CustomSectionsBlock sections={data.customSections} accentColor={theme.accentColor} textColor={theme.mutedColor} titleColor={theme.accentColor} dark={theme.dark} />
    </div>
  </div>
);

/* ════════════════════════ ENGINE 3: Sidebar (mirip Professional) ════════════════════════ */
const SidebarTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || theme.fontDefault, display: "flex", color: theme.mainText, minHeight: 1123 }}>
    <div style={{ width: 200, flexShrink: 0, background: theme.sidebarGradient, color: theme.sidebarText, padding: "32px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <PhotoOrInitial photo={data.photo} name={data.name} size={80} bgFrom={theme.photoFrom} bgTo={theme.photoTo} border="3px solid rgba(255,255,255,0.3)" />
        </div>
        <h1 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 4px", color: theme.sidebarText }}>{data.name || "Nama Lengkap"}</h1>
        <p style={{ fontSize: 11, color: theme.sidebarMuted, margin: 0, fontWeight: 500 }}>{data.title || "Jabatan"}</p>
      </div>
      <div>
        <SectionTitle color={theme.sidebarMuted} style={{ marginBottom: 8 }}>Kontak</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 10, color: theme.sidebarText }}>
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
          <SectionTitle color={theme.sidebarMuted} style={{ marginBottom: 8 }}>Keahlian</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {data.skills.map((s, i) => (
              <div key={i}>
                <span style={{ fontSize: 10, color: theme.sidebarText }}>{s}</span>
                <div style={{ height: 3, background: "rgba(255,255,255,0.15)", borderRadius: 2, marginTop: 2 }}>
                  <div style={{ height: "100%", width: `${60 + ((i * 11) % 35)}%`, background: theme.sidebarMuted, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.education.length > 0 && (
        <div>
          <SectionTitle color={theme.sidebarMuted} style={{ marginBottom: 8 }}>Pendidikan</SectionTitle>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: theme.sidebarText }}>{edu.degree || "Gelar"}</div>
              <div style={{ fontSize: 9, color: theme.sidebarMuted }}>{edu.school}</div>
              <div style={{ fontSize: 9, color: theme.sidebarMuted }}>{edu.period}{edu.gpa && ` · ${edu.gpa}`}</div>
            </div>
          ))}
        </div>
      )}
    </div>
    <div style={{ flex: 1, padding: "32px 32px", background: theme.mainBg }}>
      {data.bio && (
        <div style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: theme.mainText, borderBottom: `2px solid ${theme.accentColor}`, paddingBottom: 6, marginBottom: 10 }}>Profil</h2>
          <p style={{ fontSize: 12, lineHeight: 1.8, color: theme.mainMuted, textAlign: "justify" }}>{data.bio}</p>
        </div>
      )}
      {data.experience.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: theme.mainText, borderBottom: `2px solid ${theme.accentColor}`, paddingBottom: 6, marginBottom: 12 }}>Pengalaman</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 14, paddingLeft: 16, borderLeft: `2px solid ${theme.accentColor}` }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 13 }}>{exp.role || "Posisi"}</strong>
                <span style={{ fontSize: 10, color: "#fff", background: theme.accentColor, padding: "2px 8px", borderRadius: 4 }}>{exp.period}</span>
              </div>
              <div style={{ fontSize: 11, color: theme.accentColor, fontWeight: 600, marginBottom: 3 }}>{exp.company}</div>
              {exp.description && <p style={{ fontSize: 11, color: theme.mainMuted, lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}
      {data.projects.length > 0 && (
        <div>
          <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: theme.mainText, borderBottom: `2px solid ${theme.accentColor}`, paddingBottom: 6, marginBottom: 12 }}>Proyek</h2>
          {data.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 12, padding: "10px 14px", background: "#fff", borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <strong style={{ fontSize: 12 }}>{p.name || "Proyek"}</strong>
                {p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accentColor }}>↗</a>}
              </div>
              {p.description && <p style={{ fontSize: 11, color: theme.mainMuted, margin: "0 0 3px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}
              {p.tech && <p style={{ fontSize: 10, color: theme.accentColor, margin: 0 }}>{p.tech}</p>}
            </div>
          ))}
        </div>
      )}
      <CustomSectionsBlock sections={data.customSections} accentColor={theme.accentColor} textColor={theme.mainMuted} titleColor={theme.mainText} />
    </div>
  </div>
);

/* ════════════════════════ ENGINE 4: Centered Photo (mirip Creative) ════════════════════════ */
const CenteredPhotoTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || theme.fontDefault, background: theme.bgGradient, color: theme.textColor, padding: "36px 36px" }}>
    <div style={{ textAlign: "center", marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <PhotoOrInitial photo={data.photo} name={data.name} size={88} bgFrom={theme.photoFrom} bgTo={theme.photoTo} border="3px solid white" shadow="0 4px 20px rgba(0,0,0,0.15)" />
      </div>
      <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px", color: theme.accentColor }}>{data.name || "Nama Lengkap"}</h1>
      <p style={{ fontSize: 13, color: theme.accent2Color, margin: "0 0 10px", fontWeight: 600 }}>{data.title || "Jabatan / Role"}</p>
      <ContactRow items={data} color={theme.mutedColor} fontSize={11} />
    </div>
    {data.bio && <div style={{ background: "white", borderRadius: 16, padding: "16px 20px", marginBottom: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}><SectionTitle color={theme.accentColor}>Tentang Saya</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.8, color: theme.mutedColor, margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
    {data.skills.length > 0 && <div style={{ marginBottom: 16 }}><SectionTitle color={theme.accentColor}>Keahlian</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: theme.chipBg, color: theme.accent2Color, fontWeight: 500 }}>{s}</span>)}</div></div>}
    {data.experience.length > 0 && <div style={{ marginBottom: 16 }}><SectionTitle color={theme.accentColor}>Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ background: "white", borderRadius: 12, padding: "12px 16px", marginBottom: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", borderLeft: `3px solid ${theme.accentColor}` }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 13 }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 10, color: theme.mutedColor }}>{exp.period}</span></div><div style={{ fontSize: 11, color: theme.accent2Color, marginBottom: 3 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: theme.mutedColor, lineHeight: 1.5, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
    {data.education.length > 0 && <div style={{ marginBottom: 16 }}><SectionTitle color={theme.accentColor}>Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ background: "white", borderRadius: 12, padding: "12px 16px", marginBottom: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12 }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 10, color: theme.mutedColor }}>{edu.period}</span></div><div style={{ fontSize: 11, color: theme.accent2Color }}>{edu.school}{edu.gpa && ` · IPK ${edu.gpa}`}</div></div>))}</div>}
    {data.projects.length > 0 && <div style={{ marginBottom: 16 }}><SectionTitle color={theme.accentColor}>Proyek</SectionTitle><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>{data.projects.map((p, i) => (<div key={i} style={{ background: "white", borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><strong style={{ fontSize: 12 }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent2Color }}>↗</a>}</div>{p.description && <p style={{ fontSize: 10, color: theme.mutedColor, margin: "0 0 4px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 9, color: theme.accentColor, margin: 0 }}>{p.tech}</p>}</div>))}</div></div>}
    <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent2Color} textColor={theme.mutedColor} titleColor={theme.accentColor} />
  </div>
);

/* ════════════════════════ ENGINE 5: Dark Serif (mirip Elegant) ════════════════════════ */
const DarkSerifTemplate = ({ data, theme }) => {
  const GoldBar = () => <div style={{ width: 3, height: 14, background: theme.accentColor, borderRadius: 2 }} />;
  return (
    <div style={{ fontFamily: data.fontFamily || theme.fontDefault, background: theme.bgGradient, color: theme.textColor, padding: "44px 48px" }}>
      <div style={{ borderBottom: `1px solid ${theme.borderColor}`, paddingBottom: 20, marginBottom: 24 }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 6px", color: theme.accentColor }}>{data.name || "Nama Lengkap"}</h1>
        <p style={{ fontSize: 13, color: theme.accentColor, margin: "0 0 12px", letterSpacing: 2, textTransform: "uppercase", fontStyle: "italic" }}>{data.title || "Jabatan / Role"}</p>
        <ContactRow items={data} color={theme.mutedColor} fontSize={11} />
      </div>
      {data.bio && <div style={{ marginBottom: 24 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><GoldBar /><SectionTitle color={theme.accentColor} style={{ margin: 0 }}>Profil</SectionTitle></div><p style={{ fontSize: 12, lineHeight: 1.9, color: theme.mutedColor, fontStyle: "italic", margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
      {data.skills.length > 0 && <div style={{ marginBottom: 24 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><GoldBar /><SectionTitle color={theme.accentColor} style={{ margin: 0 }}>Kompetensi</SectionTitle></div><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 14px", border: `1px solid ${theme.borderColor}`, borderRadius: 4, color: theme.accentColor, background: theme.chipBg }}>{s}</span>)}</div></div>}
      {data.experience.length > 0 && <div style={{ marginBottom: 24 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><GoldBar /><SectionTitle color={theme.accentColor} style={{ margin: 0 }}>Pengalaman</SectionTitle></div>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${theme.borderColor}` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}><strong style={{ fontSize: 13, color: theme.textColor }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 10, color: theme.accentColor, fontStyle: "italic" }}>{exp.period}</span></div><div style={{ fontSize: 11, color: theme.accentColor, marginBottom: 4 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: theme.mutedColor, lineHeight: 1.7, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
      {data.education.length > 0 && <div style={{ marginBottom: 24 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><GoldBar /><SectionTitle color={theme.accentColor} style={{ margin: 0 }}>Pendidikan</SectionTitle></div>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12, color: theme.textColor }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 10, color: theme.accentColor }}>{edu.period}</span></div><div style={{ fontSize: 11, color: theme.mutedColor }}>{edu.school}{edu.gpa && ` · IPK ${edu.gpa}`}</div></div>))}</div>}
      {data.projects.length > 0 && <div style={{ marginBottom: 24 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><GoldBar /><SectionTitle color={theme.accentColor} style={{ margin: 0 }}>Proyek</SectionTitle></div>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 10, padding: "12px 16px", border: `1px solid ${theme.borderColor}`, borderRadius: 8, background: theme.chipBg }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><strong style={{ fontSize: 12, color: theme.textColor }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accentColor }}>↗</a>}</div>{p.description && <p style={{ fontSize: 11, color: theme.mutedColor, margin: "0 0 3px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 10, color: theme.accentColor, margin: 0 }}>{p.tech}</p>}</div>))}</div>}
      <CustomSectionsBlock sections={data.customSections} accentColor={theme.accentColor} textColor={theme.mutedColor} titleColor={theme.accentColor} dark />
      <div style={{ borderTop: `1px solid ${theme.borderColor}`, marginTop: 28, paddingTop: 12, textAlign: "center" }}><span style={{ fontSize: 9, color: theme.accentColor, letterSpacing: 3, textTransform: "uppercase" }}>{data.name || "Curriculum Vitae"}</span></div>
    </div>
  );
};

/* ════════════════════════ ENGINE 6: Boxed Photo (mirip Neon) ════════════════════════ */
const BoxedPhotoTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || theme.fontDefault, background: theme.bg, color: theme.accentColor, padding: "32px 36px" }}>
    <div style={{ border: `1px solid ${theme.borderColor}`, borderRadius: 8, padding: "20px 24px", marginBottom: 24, background: theme.boxBg }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <PhotoOrInitial photo={data.photo} name={data.name} size={76} bgFrom={theme.photoFrom} bgTo={theme.photoTo} border={`2px solid ${theme.accentColor}`} />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 23, fontWeight: 700, margin: "0 0 4px", color: theme.accentColor }}>{data.name || "Nama Lengkap"}</h1>
          <p style={{ fontSize: 12, color: theme.accent2Color, margin: "0 0 10px", letterSpacing: 1 }}>{data.title || "Jabatan / Role"}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 14px", fontSize: 10, color: theme.mutedColor }}>{data.email && <span>✉ {data.email}</span>}{data.phone && <span>☎ {data.phone}</span>}{data.location && <span>◈ {data.location}</span>}{data.github && <span>⌥ {data.github}</span>}</div>
        </div>
      </div>
    </div>
    {data.bio && <div style={{ marginBottom: 20, padding: "14px 18px", border: `1px solid ${theme.borderColor}`, borderRadius: 6, background: theme.boxBg }}><p style={{ fontSize: 12, lineHeight: 1.8, color: theme.mutedColor, margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
    {data.skills.length > 0 && <div style={{ marginBottom: 20 }}><div style={{ fontSize: 9, color: theme.mutedColor, letterSpacing: 2, marginBottom: 8 }}>// SKILLS</div><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", border: `1px solid ${theme.borderColor}`, borderRadius: 4, color: theme.accentColor, background: theme.boxBg }}>{s}</span>)}</div></div>}
    {data.experience.length > 0 && <div style={{ marginBottom: 20 }}><div style={{ fontSize: 9, color: theme.mutedColor, letterSpacing: 2, marginBottom: 10 }}>// EXPERIENCE</div>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 12, padding: "12px 16px", border: `1px solid ${theme.borderColor}`, borderRadius: 6, background: theme.boxBg, borderLeft: `3px solid ${theme.accent2Color}` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}><strong style={{ fontSize: 13, color: theme.headingColor }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 10, color: theme.accent2Color }}>{exp.period}</span></div><div style={{ fontSize: 11, color: theme.accent2Color, marginBottom: 3 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: theme.mutedColor, lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
    {data.education.length > 0 && <div style={{ marginBottom: 20 }}><div style={{ fontSize: 9, color: theme.mutedColor, letterSpacing: 2, marginBottom: 10 }}>// EDUCATION</div>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 8, padding: "10px 14px", border: `1px solid ${theme.borderColor}`, borderRadius: 6 }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12, color: theme.headingColor }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 10, color: theme.mutedColor }}>{edu.period}</span></div><div style={{ fontSize: 11, color: theme.accent2Color }}>{edu.school}{edu.gpa && ` :: IPK ${edu.gpa}`}</div></div>))}</div>}
    {data.projects.length > 0 && <div style={{ marginBottom: 20 }}><div style={{ fontSize: 9, color: theme.mutedColor, letterSpacing: 2, marginBottom: 10 }}>// PROJECTS</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>{data.projects.map((p, i) => (<div key={i} style={{ padding: "12px 14px", border: `1px solid ${theme.borderColor}`, borderRadius: 6, background: theme.boxBg }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><strong style={{ fontSize: 12, color: theme.accentColor }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent2Color }}>↗</a>}</div>{p.description && <p style={{ fontSize: 10, color: theme.mutedColor, margin: "0 0 4px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 9, color: theme.accent2Color, margin: 0 }}>{p.tech}</p>}</div>))}</div></div>}
    <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent2Color} textColor={theme.mutedColor} titleColor={theme.mutedColor} dark />
  </div>
);

/* ════════════════════════ ENGINE 7: Decorative Banner (mirip Sunset) ════════════════════════ */
const DecorativeBannerTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || theme.fontDefault, background: theme.bodyBg, color: theme.bodyText }}>
    <div style={{ background: theme.bannerGradient, padding: "36px 40px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
      <div style={{ position: "absolute", bottom: -20, left: 60, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 20, position: "relative" }}>
        <PhotoOrInitial photo={data.photo} name={data.name} size={84} bgFrom="rgba(255,255,255,0.3)" bgTo="rgba(255,255,255,0.15)" border="3px solid rgba(255,255,255,0.6)" shadow="0 4px 20px rgba(0,0,0,0.25)" />
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", color: "#fff" }}>{data.name || "Nama Lengkap"}</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", margin: "0 0 12px", fontWeight: 600 }}>{data.title || "Jabatan / Role"}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 14px", fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{data.location && <span>📍 {data.location}</span>}{data.email && <span>✉ {data.email}</span>}{data.phone && <span>📞 {data.phone}</span>}{data.website && <span>🌐 {data.website}</span>}</div>
        </div>
      </div>
    </div>
    <div style={{ padding: "28px 40px" }}>
      {data.bio && <div style={{ marginBottom: 22, padding: "16px 20px", background: "white", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", borderLeft: `4px solid ${theme.accentColor}` }}><SectionTitle color={theme.accentColor}>Tentang Saya</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.8, color: "#374151", margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
      {data.skills.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accent2Color}>Keahlian</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "5px 14px", borderRadius: 20, background: theme.skillPalette[i % theme.skillPalette.length].bg, color: theme.skillPalette[i % theme.skillPalette.length].fg, fontWeight: 600 }}>{s}</span>)}</div></div>}
      {data.experience.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accent2Color}>Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 14, padding: "14px 18px", background: "white", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderTop: `3px solid ${theme.cardBorders[i % theme.cardBorders.length]}` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><strong style={{ fontSize: 13, color: "#1c1917" }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 10, color: "#fff", background: theme.bannerGradient, padding: "2px 10px", borderRadius: 10 }}>{exp.period}</span></div><div style={{ fontSize: 11, color: theme.accent2Color, fontWeight: 600, marginBottom: 3 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
      {data.education.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accent2Color}>Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 10, padding: "12px 16px", background: "white", borderRadius: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12, color: "#1c1917" }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 10, color: theme.accent2Color }}>{edu.period}</span></div><div style={{ fontSize: 11, color: theme.accentColor }}>{edu.school}{edu.gpa && ` · IPK ${edu.gpa}`}</div></div>))}</div>}
      {data.projects.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accent2Color}>Proyek</SectionTitle><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{data.projects.map((p, i) => (<div key={i} style={{ padding: "14px", background: "white", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderBottom: `3px solid ${theme.cardBorders[i % theme.cardBorders.length]}` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><strong style={{ fontSize: 12, color: "#1c1917" }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent2Color }}>↗</a>}</div>{p.description && <p style={{ fontSize: 10, color: "#6b7280", margin: "0 0 4px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 9, color: theme.accentColor, margin: 0, fontWeight: 600 }}>{p.tech}</p>}</div>))}</div></div>}
      <CustomSectionsBlock sections={data.customSections} accentColor={theme.accent2Color} textColor="#6b7280" titleColor={theme.accent2Color} />
    </div>
  </div>
);

/* ════════════════════════ ENGINE 8: Solid Banner + White Cards (mirip Forest) ════════════════════════ */
const SolidBannerCardsTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || theme.fontDefault, background: theme.bodyBg, color: theme.bodyText }}>
    <div style={{ background: theme.bannerGradient, padding: "32px 40px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px", color: "#fff" }}>{data.name || "Nama Lengkap"}</h1>
      <p style={{ fontSize: 13, color: theme.bannerMuted, margin: "0 0 12px", fontStyle: "italic" }}>{data.title || "Jabatan / Role"}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 16px", fontSize: 11, color: theme.bannerMuted }}>{data.location && <span>📍 {data.location}</span>}{data.email && <span>✉ {data.email}</span>}{data.phone && <span>📞 {data.phone}</span>}{data.website && <span>🌐 {data.website}</span>}{data.linkedin && <span>in {data.linkedin}</span>}{data.github && <span>⌥ {data.github}</span>}</div>
    </div>
    <div style={{ padding: "28px 40px" }}>
      {data.bio && <div style={{ marginBottom: 22, padding: "16px 20px", background: theme.cardBg, borderRadius: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: `1px solid ${theme.cardBorder}` }}><SectionTitle color={theme.accentColor}>Profil</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.8, color: "#374151", margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
      {data.skills.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accentColor}>Keahlian</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 6, background: theme.chipBg, border: `1px solid ${theme.cardBorder}`, color: theme.accentColor, fontWeight: 500 }}>{s}</span>)}</div></div>}
      {data.experience.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accentColor}>Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 14, padding: "14px 18px", background: theme.cardBg, borderRadius: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", borderLeft: `4px solid ${theme.accent2Color}` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><strong style={{ fontSize: 13 }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 10, color: theme.accentColor, background: theme.chipBg, padding: "2px 8px", borderRadius: 10 }}>{exp.period}</span></div><div style={{ fontSize: 11, color: theme.accent2Color, fontWeight: 600, marginBottom: 3 }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
      {data.education.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accentColor}>Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 10, padding: "12px 16px", background: theme.cardBg, borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12 }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 10, color: theme.accent2Color }}>{edu.period}</span></div><div style={{ fontSize: 11, color: theme.accentColor }}>{edu.school}{edu.gpa && ` · IPK ${edu.gpa}`}</div></div>))}</div>}
      {data.projects.length > 0 && <div style={{ marginBottom: 22 }}><SectionTitle color={theme.accentColor}>Proyek</SectionTitle>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 10, padding: "12px 16px", background: theme.cardBg, borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${theme.cardBorder}` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><strong style={{ fontSize: 12 }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accent2Color }}>↗</a>}</div>{p.description && <p style={{ fontSize: 11, color: "#6b7280", margin: "0 0 3px", lineHeight: 1.5, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 10, color: theme.accent2Color, margin: 0 }}>{p.tech}</p>}</div>))}</div>}
      <CustomSectionsBlock sections={data.customSections} accentColor={theme.accentColor} textColor="#6b7280" titleColor={theme.accentColor} />
    </div>
  </div>
);

/* ════════════════════════ ENGINE 9: Compact Header (mirip Aurora) ════════════════════════ */
const CompactHeaderTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || theme.fontDefault, background: theme.bgGradient, color: theme.textColor, height: "100%", backgroundSize: "cover" }}>
    <div style={{ padding: "32px 40px", background: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
        <PhotoOrInitial photo={data.photo} name={data.name} size={64} bgFrom={theme.photoFrom} bgTo={theme.photoTo} border="2px solid rgba(255,255,255,0.2)" shadow="0 4px 12px rgba(0,0,0,0.3)" />
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: "#fff" }}>{data.name || "Nama Lengkap"}</h1>
          <p style={{ fontSize: 14, color: theme.accent2Color, margin: "4px 0 0" }}>{data.title || "Jabatan / Role"}</p>
        </div>
      </div>
      <ContactRow items={data} color={theme.mutedColor} fontSize={11} />
    </div>
    <div style={{ padding: "0 40px 32px" }}>
      {data.bio && <div style={{ marginBottom: 24, background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: 16 }}><SectionTitle color={theme.accentColor} style={{ marginBottom: 8 }}>Tentang Saya</SectionTitle><p style={{ fontSize: 12, lineHeight: 1.8, color: theme.mutedColor, margin: 0, textAlign: "justify" }}>{data.bio}</p></div>}
      {data.skills.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accentColor}>Keahlian</SectionTitle><div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{data.skills.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 9999, background: theme.chipBg, border: `1px solid ${theme.accentColor}`, color: theme.textColor }}>{s}</span>)}</div></div>}
      {data.experience.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accentColor}>Pengalaman</SectionTitle>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 16, background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.1)" }}><strong style={{ fontSize: 13, color: "#fff", display: "block" }}>{exp.role || "Posisi"}</strong><span style={{ fontSize: 11, color: theme.accent2Color }}>{exp.company} · {exp.period}</span>{exp.description && <p style={{ fontSize: 11, color: theme.mutedColor, marginTop: 8, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
      {data.education.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accentColor}>Pendidikan</SectionTitle>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 12 }}><strong style={{ fontSize: 13, color: "#fff" }}>{edu.degree || "Gelar"}</strong><span style={{ fontSize: 12, color: theme.accent2Color, display: "block" }}>{edu.school} · {edu.period}{edu.gpa && ` (IPK ${edu.gpa})`}</span></div>))}</div>}
      {data.projects.length > 0 && <div style={{ marginBottom: 24 }}><SectionTitle color={theme.accentColor}>Proyek</SectionTitle>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 12 }}><strong style={{ fontSize: 13, color: "#fff" }}>{p.name || "Proyek"}</strong>{p.description && <p style={{ fontSize: 11, color: theme.mutedColor, margin: "4px 0", textAlign: "justify" }}>{p.description}</p>}{p.tech && <span style={{ fontSize: 10, color: theme.accent2Color }}>{p.tech}</span>}{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accentColor, display: "block" }}>↗ Link</a>}</div>))}</div>}
      <CustomSectionsBlock sections={data.customSections} accentColor={theme.accentColor} textColor={theme.mutedColor} titleColor={theme.accentColor} dark />
    </div>
  </div>
);

/* ════════════════════════ ENGINE 10: Magazine 2-kolom (mirip Retro) ════════════════════════ */
const MagazineTemplate = ({ data, theme }) => (
  <div style={{ fontFamily: data.fontFamily || theme.fontDefault, background: theme.bg, color: theme.textColor, padding: "36px 44px" }}>
    <div style={{ textAlign: "center", borderBottom: `4px double ${theme.accentColor}`, borderTop: `4px double ${theme.accentColor}`, padding: "12px 0", marginBottom: 20 }}>
      <div style={{ fontSize: 9, letterSpacing: 4, color: theme.accentColor, marginBottom: 4, textTransform: "uppercase" }}>— Curriculum Vitae —</div>
      <h1 style={{ fontSize: 30, fontWeight: 900, margin: "0 0 4px", letterSpacing: "1px", color: theme.textColor, textTransform: "uppercase" }}>{data.name || "NAMA LENGKAP"}</h1>
      <div style={{ fontSize: 12, color: theme.accentColor, fontStyle: "italic", marginBottom: 6 }}>{data.title || "Jabatan / Role"}</div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 20px", fontSize: 10, color: theme.mutedColor }}>{data.email && <span>✉ {data.email}</span>}{data.phone && <span>✆ {data.phone}</span>}{data.location && <span>⚑ {data.location}</span>}{data.website && <span>⚇ {data.website}</span>}</div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "0 28px" }}>
      <div>
        {data.bio && <div style={{ marginBottom: 18 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: theme.accentColor, borderBottom: `2px solid ${theme.accentColor}`, paddingBottom: 4, marginBottom: 8 }}>◆ Profil</div><p style={{ fontSize: 12, lineHeight: 1.9, color: theme.textColor, textAlign: "justify", margin: 0, textIndent: 16 }}>{data.bio}</p></div>}
        {data.experience.length > 0 && <div style={{ marginBottom: 18 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: theme.accentColor, borderBottom: `2px solid ${theme.accentColor}`, paddingBottom: 4, marginBottom: 10 }}>◆ Pengalaman</div>{data.experience.map((exp, i) => (<div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: `1px dashed ${theme.mutedColor}` }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12 }}>{exp.role || "Posisi"}</strong><em style={{ fontSize: 10, color: theme.accentColor }}>{exp.period}</em></div><div style={{ fontSize: 11, color: theme.accentColor, marginBottom: 2, fontStyle: "italic" }}>{exp.company}</div>{exp.description && <p style={{ fontSize: 11, color: theme.textColor, lineHeight: 1.7, margin: 0, textAlign: "justify" }}>{exp.description}</p>}</div>))}</div>}
        {data.projects.length > 0 && <div><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: theme.accentColor, borderBottom: `2px solid ${theme.accentColor}`, paddingBottom: 4, marginBottom: 10 }}>◆ Proyek</div>{data.projects.map((p, i) => (<div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: `1px dashed ${theme.mutedColor}` }}><div style={{ display: "flex", justifyContent: "space-between" }}><strong style={{ fontSize: 12 }}>{p.name || "Proyek"}</strong>{p.url && <a href={p.url} style={{ fontSize: 10, color: theme.accentColor }}>↗</a>}</div>{p.description && <p style={{ fontSize: 11, color: theme.textColor, margin: "2px 0", lineHeight: 1.6, textAlign: "justify" }}>{p.description}</p>}{p.tech && <p style={{ fontSize: 10, color: theme.accentColor, margin: 0, fontStyle: "italic" }}>Tech: {p.tech}</p>}</div>))}</div>}
        <CustomSectionsBlock sections={data.customSections} accentColor={theme.accentColor} textColor={theme.textColor} titleColor={theme.accentColor} />
      </div>
      <div style={{ borderLeft: `2px solid ${theme.accentColor}`, paddingLeft: 20 }}>
        {data.skills.length > 0 && <div style={{ marginBottom: 18 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: theme.accentColor, borderBottom: `2px solid ${theme.accentColor}`, paddingBottom: 4, marginBottom: 8 }}>◆ Keahlian</div><div style={{ display: "flex", flexDirection: "column", gap: 4 }}>{data.skills.map((s, i) => <div key={i} style={{ fontSize: 11, color: theme.textColor, paddingLeft: 8, borderLeft: `2px solid ${theme.accentColor}` }}>· {s}</div>)}</div></div>}
        {data.education.length > 0 && <div style={{ marginBottom: 18 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: theme.accentColor, borderBottom: `2px solid ${theme.accentColor}`, paddingBottom: 4, marginBottom: 8 }}>◆ Pendidikan</div>{data.education.map((edu, i) => (<div key={i} style={{ marginBottom: 10 }}><strong style={{ fontSize: 11, color: theme.textColor }}>{edu.degree || "Gelar"}</strong><div style={{ fontSize: 10, color: theme.accentColor, fontStyle: "italic" }}>{edu.school}</div><div style={{ fontSize: 10, color: theme.mutedColor }}>{edu.period}{edu.gpa && ` · IPK ${edu.gpa}`}</div></div>))}</div>}
        {(data.linkedin || data.github) && <div><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: theme.accentColor, borderBottom: `2px solid ${theme.accentColor}`, paddingBottom: 4, marginBottom: 8 }}>◆ Tautan</div>{data.linkedin && <div style={{ fontSize: 10, color: theme.textColor, marginBottom: 4 }}>in {data.linkedin}</div>}{data.github && <div style={{ fontSize: 10, color: theme.textColor }}>⌥ {data.github}</div>}</div>}
      </div>
    </div>
    <div style={{ textAlign: "center", marginTop: 24, fontSize: 9, color: theme.accentColor, borderTop: `2px double ${theme.accentColor}`, paddingTop: 8, letterSpacing: 3 }}>— END — · {data.name || "CURRICULUM VITAE"} —</div>
  </div>
);

/* ════════════════════════ 40 TEMA BARU ════════════════════════ */

// Family A — Border Header (4): slate, ivory, crimson, azure
const SlateTemplate = ({ data }) => <BorderHeaderTemplate data={data} theme={{ fontDefault: "Georgia,serif", bg: "#f8fafc", textColor: "#1e293b", mutedColor: "#64748b", accentColor: "#475569" }} />;
const IvoryTemplate = ({ data }) => <BorderHeaderTemplate data={data} theme={{ fontDefault: "'Times New Roman',serif", bg: "#fffdf7", textColor: "#292524", mutedColor: "#78716c", accentColor: "#92400e" }} />;
const CrimsonTemplate = ({ data }) => <BorderHeaderTemplate data={data} theme={{ fontDefault: "Georgia,serif", bg: "#fff", textColor: "#1f1315", mutedColor: "#78716c", accentColor: "#b91c1c" }} />;
const AzureTemplate = ({ data }) => <BorderHeaderTemplate data={data} theme={{ fontDefault: "Arial,sans-serif", bg: "#f8fafc", textColor: "#0f172a", mutedColor: "#64748b", accentColor: "#0284c7" }} />;

// Family B — Gradient Banner (4): midnight, emerald, coral, graphite
const MidnightTemplate = ({ data }) => <GradientBannerTemplate data={data} theme={{ fontDefault: "Arial,sans-serif", bodyBg: "#0f0f1a", bodyText: "#e2e8f0", bannerGradient: "linear-gradient(135deg,#312e81,#581c87)", bannerTextColor: "#d8b4fe", accentColor: "#a855f7", mutedColor: "#94a3b8", cardBg: "rgba(168,85,247,0.1)", chipBg: "rgba(168,85,247,0.12)", hasPhoto: true, photoFrom: "#a855f7", photoTo: "#6366f1", dark: true }} />;
const EmeraldTemplate = ({ data }) => <GradientBannerTemplate data={data} theme={{ fontDefault: "Calibri,sans-serif", bodyBg: "#f0fdf9", bodyText: "#022c22", bannerGradient: "linear-gradient(135deg,#065f46,#047857)", bannerTextColor: "#a7f3d0", accentColor: "#059669", mutedColor: "#475569", cardBg: "#fff", chipBg: "rgba(5,150,105,0.1)", hasPhoto: false }} />;
const CoralTemplate = ({ data }) => <GradientBannerTemplate data={data} theme={{ fontDefault: "Verdana,sans-serif", bodyBg: "#fff5f5", bodyText: "#3f1212", bannerGradient: "linear-gradient(135deg,#f43f5e,#fb923c)", bannerTextColor: "#ffe4e6", accentColor: "#e11d48", mutedColor: "#57534e", cardBg: "#fff", chipBg: "rgba(225,29,72,0.08)", hasPhoto: true, photoFrom: "#fda4af", photoTo: "#fdba74" }} />;
const GraphiteTemplate = ({ data }) => <GradientBannerTemplate data={data} theme={{ fontDefault: "'Trebuchet MS',sans-serif", bodyBg: "#18181b", bodyText: "#e4e4e7", bannerGradient: "linear-gradient(135deg,#27272a,#3f3f46)", bannerTextColor: "#d4d4d8", accentColor: "#a1a1aa", mutedColor: "#a1a1aa", cardBg: "rgba(255,255,255,0.04)", chipBg: "rgba(255,255,255,0.06)", hasPhoto: false, dark: true }} />;

// Family C — Centered Photo (4): blossom, lavender, citrus, mint
const BlossomTemplate = ({ data }) => <CenteredPhotoTemplate data={data} theme={{ fontDefault: "Verdana,sans-serif", bgGradient: "linear-gradient(135deg,#fff1f2,#fff7ed)", textColor: "#1e293b", accentColor: "#e11d48", accent2Color: "#fb7185", mutedColor: "#64748b", chipBg: "linear-gradient(to right,#ffe4e6,#fed7aa)", photoFrom: "#fb7185", photoTo: "#fdba74" }} />;
const LavenderTemplate = ({ data }) => <CenteredPhotoTemplate data={data} theme={{ fontDefault: "Calibri,sans-serif", bgGradient: "linear-gradient(135deg,#f5f3ff,#eef2ff)", textColor: "#1e293b", accentColor: "#7c3aed", accent2Color: "#a78bfa", mutedColor: "#64748b", chipBg: "linear-gradient(to right,#ede9fe,#e0e7ff)", photoFrom: "#a78bfa", photoTo: "#818cf8" }} />;
const CitrusTemplate = ({ data }) => <CenteredPhotoTemplate data={data} theme={{ fontDefault: "Arial,sans-serif", bgGradient: "linear-gradient(135deg,#fefce8,#fff7ed)", textColor: "#1e293b", accentColor: "#ca8a04", accent2Color: "#f59e0b", mutedColor: "#64748b", chipBg: "linear-gradient(to right,#fef9c3,#fed7aa)", photoFrom: "#fbbf24", photoTo: "#fb923c" }} />;
const MintTemplate = ({ data }) => <CenteredPhotoTemplate data={data} theme={{ fontDefault: "Verdana,sans-serif", bgGradient: "linear-gradient(135deg,#f0fdfa,#ecfdf5)", textColor: "#1e293b", accentColor: "#0d9488", accent2Color: "#2dd4bf", mutedColor: "#64748b", chipBg: "linear-gradient(to right,#ccfbf1,#d1fae5)", photoFrom: "#2dd4bf", photoTo: "#34d399" }} />;

// Family D — Sidebar (4): obsidian, burgundy, tealside, charcoal
const ObsidianTemplate = ({ data }) => <SidebarTemplate data={data} theme={{ fontDefault: "Arial,sans-serif", sidebarGradient: "linear-gradient(180deg,#0a0a0a,#1c1c1c)", sidebarText: "#f4f4f5", sidebarMuted: "#a1a1aa", mainBg: "#fafafa", mainText: "#18181b", mainMuted: "#52525b", accentColor: "#27272a", photoFrom: "#52525b", photoTo: "#27272a" }} />;
const BurgundyTemplate = ({ data }) => <SidebarTemplate data={data} theme={{ fontDefault: "Georgia,serif", sidebarGradient: "linear-gradient(180deg,#450a0a,#7f1d1d)", sidebarText: "#fef2f2", sidebarMuted: "#fca5a5", mainBg: "#fff5f5", mainText: "#1f1315", mainMuted: "#57534e", accentColor: "#b91c1c", photoFrom: "#dc2626", photoTo: "#7f1d1d" }} />;
const TealSideTemplate = ({ data }) => <SidebarTemplate data={data} theme={{ fontDefault: "Calibri,sans-serif", sidebarGradient: "linear-gradient(180deg,#134e4a,#0f766e)", sidebarText: "#f0fdfa", sidebarMuted: "#5eead4", mainBg: "#f0fdfa", mainText: "#022c22", mainMuted: "#475569", accentColor: "#0d9488", photoFrom: "#2dd4bf", photoTo: "#0f766e" }} />;
const CharcoalTemplate = ({ data }) => <SidebarTemplate data={data} theme={{ fontDefault: "'Trebuchet MS',sans-serif", sidebarGradient: "linear-gradient(180deg,#1e293b,#334155)", sidebarText: "#f1f5f9", sidebarMuted: "#94a3b8", mainBg: "#f8fafc", mainText: "#0f172a", mainMuted: "#475569", accentColor: "#334155", photoFrom: "#64748b", photoTo: "#334155" }} />;

// Family E — Dark Serif (4): rosegold, platinum, ambernoir, sapphire
const RoseGoldTemplate = ({ data }) => <DarkSerifTemplate data={data} theme={{ fontDefault: "Garamond,serif", bgGradient: "linear-gradient(135deg,#2a1a1f,#3d1f2b)", textColor: "#f5e6ea", accentColor: "#e8a0bc", borderColor: "rgba(232,160,188,0.25)", mutedColor: "rgba(245,230,234,0.55)", chipBg: "rgba(232,160,188,0.08)" }} />;
const PlatinumTemplate = ({ data }) => <DarkSerifTemplate data={data} theme={{ fontDefault: "Cambria,serif", bgGradient: "linear-gradient(135deg,#1c1c1e,#2c2c2e)", textColor: "#f2f2f2", accentColor: "#c7c7cc", borderColor: "rgba(199,199,204,0.25)", mutedColor: "rgba(242,242,242,0.55)", chipBg: "rgba(199,199,204,0.08)" }} />;
const AmberNoirTemplate = ({ data }) => <DarkSerifTemplate data={data} theme={{ fontDefault: "Garamond,serif", bgGradient: "linear-gradient(135deg,#1a1207,#2b1c0a)", textColor: "#f5ecd9", accentColor: "#e09b3d", borderColor: "rgba(224,155,61,0.25)", mutedColor: "rgba(245,236,217,0.55)", chipBg: "rgba(224,155,61,0.08)" }} />;
const SapphireTemplate = ({ data }) => <DarkSerifTemplate data={data} theme={{ fontDefault: "'Book Antiqua',serif", bgGradient: "linear-gradient(135deg,#0a1530,#13224a)", textColor: "#e6edf7", accentColor: "#7eb6f6", borderColor: "rgba(126,182,246,0.25)", mutedColor: "rgba(230,237,247,0.55)", chipBg: "rgba(126,182,246,0.08)" }} />;

// Family F — Boxed Photo (4): violetneon, amberneon, blueneon, redneon
const VioletNeonTemplate = ({ data }) => <BoxedPhotoTemplate data={data} theme={{ fontDefault: "'Courier New',monospace", bg: "#0a0014", borderColor: "rgba(192,38,211,0.3)", boxBg: "rgba(192,38,211,0.04)", accentColor: "#e879f9", accent2Color: "#c026d3", mutedColor: "rgba(232,121,249,0.55)", headingColor: "#fff", photoFrom: "#e879f9", photoTo: "#a21caf" }} />;
const AmberNeonTemplate = ({ data }) => <BoxedPhotoTemplate data={data} theme={{ fontDefault: "'Courier New',monospace", bg: "#140a00", borderColor: "rgba(245,158,11,0.3)", boxBg: "rgba(245,158,11,0.04)", accentColor: "#fbbf24", accent2Color: "#f59e0b", mutedColor: "rgba(251,191,36,0.55)", headingColor: "#fff", photoFrom: "#fbbf24", photoTo: "#b45309" }} />;
const BlueNeonTemplate = ({ data }) => <BoxedPhotoTemplate data={data} theme={{ fontDefault: "'Courier New',monospace", bg: "#00060f", borderColor: "rgba(56,189,248,0.3)", boxBg: "rgba(56,189,248,0.04)", accentColor: "#7dd3fc", accent2Color: "#38bdf8", mutedColor: "rgba(125,211,252,0.55)", headingColor: "#fff", photoFrom: "#7dd3fc", photoTo: "#0369a1" }} />;
const RedNeonTemplate = ({ data }) => <BoxedPhotoTemplate data={data} theme={{ fontDefault: "'Courier New',monospace", bg: "#0f0000", borderColor: "rgba(248,113,113,0.3)", boxBg: "rgba(248,113,113,0.04)", accentColor: "#fca5a5", accent2Color: "#ef4444", mutedColor: "rgba(252,165,165,0.55)", headingColor: "#fff", photoFrom: "#fca5a5", photoTo: "#b91c1c" }} />;

// Family G — Decorative Banner (4): ocean, berry, autumn, tropical
const OceanTemplate = ({ data }) => <DecorativeBannerTemplate data={data} theme={{ fontDefault: "Calibri,sans-serif", bodyBg: "#f0f9ff", bodyText: "#0c1f2e", bannerGradient: "linear-gradient(135deg,#0c4a6e 0%,#0369a1 50%,#0891b2 100%)", accentColor: "#0369a1", accent2Color: "#0891b2", skillPalette: [{bg:"#e0f2fe",fg:"#075985"},{bg:"#cffafe",fg:"#0e7490"},{bg:"#dbeafe",fg:"#1e40af"},{bg:"#ecfeff",fg:"#155e75"},{bg:"#e0e7ff",fg:"#3730a3"}], cardBorders: ["#0369a1","#0891b2","#0e7490","#155e75"] }} />;
const BerryTemplate = ({ data }) => <DecorativeBannerTemplate data={data} theme={{ fontDefault: "Verdana,sans-serif", bodyBg: "#fdf4ff", bodyText: "#2e0c2e", bannerGradient: "linear-gradient(135deg,#86198f 0%,#a21caf 50%,#c026d3 100%)", accentColor: "#a21caf", accent2Color: "#c026d3", skillPalette: [{bg:"#fae8ff",fg:"#86198f"},{bg:"#fce7f3",fg:"#9d174d"},{bg:"#f3e8ff",fg:"#6b21a8"},{bg:"#fdf2f8",fg:"#9d174d"},{bg:"#f5d0fe",fg:"#701a75"}], cardBorders: ["#a21caf","#c026d3","#d946ef","#9d174d"] }} />;
const AutumnTemplate = ({ data }) => <DecorativeBannerTemplate data={data} theme={{ fontDefault: "Georgia,serif", bodyBg: "#fffbeb", bodyText: "#27150a", bannerGradient: "linear-gradient(135deg,#7c2d12 0%,#b45309 50%,#d97706 100%)", accentColor: "#b45309", accent2Color: "#d97706", skillPalette: [{bg:"#fef3c7",fg:"#92400e"},{bg:"#fde8d8",fg:"#9a3412"},{bg:"#fef9c3",fg:"#854d0e"},{bg:"#ffedd5",fg:"#9a3412"},{bg:"#fef2f2",fg:"#991b1b"}], cardBorders: ["#b45309","#d97706","#92400e","#9a3412"] }} />;
const TropicalTemplate = ({ data }) => <DecorativeBannerTemplate data={data} theme={{ fontDefault: "Verdana,sans-serif", bodyBg: "#fff7f0", bodyText: "#3a1408", bannerGradient: "linear-gradient(135deg,#db2777 0%,#f472b6 50%,#fbbf24 100%)", accentColor: "#db2777", accent2Color: "#f59e0b", skillPalette: [{bg:"#fce7f3",fg:"#9d174d"},{bg:"#fef3c7",fg:"#92400e"},{bg:"#ffe4e6",fg:"#be123c"},{bg:"#fef9c3",fg:"#854d0e"},{bg:"#fdf2f8",fg:"#9d174d"}], cardBorders: ["#db2777","#f59e0b","#f472b6","#fb923c"] }} />;

// Family H — Solid Banner + Cards (4): oceancard, plum, slatecard, terracotta
const OceanCardTemplate = ({ data }) => <SolidBannerCardsTemplate data={data} theme={{ fontDefault: "Georgia,serif", bodyBg: "#f0f9ff", bodyText: "#0c2a3a", bannerGradient: "linear-gradient(135deg,#075985,#0369a1)", bannerMuted: "rgba(224,242,254,0.75)", cardBg: "#fff", cardBorder: "#bae6fd", accentColor: "#075985", accent2Color: "#0284c7", chipBg: "#e0f2fe" }} />;
const PlumTemplate = ({ data }) => <SolidBannerCardsTemplate data={data} theme={{ fontDefault: "Garamond,serif", bodyBg: "#faf5ff", bodyText: "#2e1a3a", bannerGradient: "linear-gradient(135deg,#581c87,#7e22ce)", bannerMuted: "rgba(243,232,255,0.75)", cardBg: "#fff", cardBorder: "#e9d5ff", accentColor: "#6b21a8", accent2Color: "#9333ea", chipBg: "#f3e8ff" }} />;
const SlateCardTemplate = ({ data }) => <SolidBannerCardsTemplate data={data} theme={{ fontDefault: "Cambria,serif", bodyBg: "#f8fafc", bodyText: "#0f172a", bannerGradient: "linear-gradient(135deg,#334155,#475569)", bannerMuted: "rgba(226,232,240,0.75)", cardBg: "#fff", cardBorder: "#e2e8f0", accentColor: "#334155", accent2Color: "#475569", chipBg: "#f1f5f9" }} />;
const TerracottaTemplate = ({ data }) => <SolidBannerCardsTemplate data={data} theme={{ fontDefault: "Georgia,serif", bodyBg: "#fff7ed", bodyText: "#431407", bannerGradient: "linear-gradient(135deg,#9a3412,#c2410c)", bannerMuted: "rgba(255,237,213,0.8)", cardBg: "#fff", cardBorder: "#fed7aa", accentColor: "#9a3412", accent2Color: "#c2410c", chipBg: "#ffedd5" }} />;

// Family I — Compact Header (4): nebula, galaxy, cosmic, solar
const NebulaTemplate = ({ data }) => <CompactHeaderTemplate data={data} theme={{ fontDefault: "Arial,sans-serif", bgGradient: "linear-gradient(135deg,#581c87,#9d174d)", textColor: "#fae8ff", accentColor: "#f0abfc", accent2Color: "#e879f9", mutedColor: "#f3d7fb", chipBg: "rgba(240,171,252,0.15)", photoFrom: "#f0abfc", photoTo: "#c026d3" }} />;
const GalaxyTemplate = ({ data }) => <CompactHeaderTemplate data={data} theme={{ fontDefault: "Calibri,sans-serif", bgGradient: "linear-gradient(135deg,#1e1b4b,#312e81)", textColor: "#e0e7ff", accentColor: "#a5b4fc", accent2Color: "#818cf8", mutedColor: "#c7d2fe", chipBg: "rgba(165,180,252,0.15)", photoFrom: "#a5b4fc", photoTo: "#4338ca" }} />;
const CosmicTemplate = ({ data }) => <CompactHeaderTemplate data={data} theme={{ fontDefault: "Verdana,sans-serif", bgGradient: "linear-gradient(135deg,#0c4a6e,#134e4a)", textColor: "#ecfeff", accentColor: "#67e8f9", accent2Color: "#22d3ee", mutedColor: "#cffafe", chipBg: "rgba(103,232,249,0.15)", photoFrom: "#67e8f9", photoTo: "#0e7490" }} />;
const SolarTemplate = ({ data }) => <CompactHeaderTemplate data={data} theme={{ fontDefault: "'Trebuchet MS',sans-serif", bgGradient: "linear-gradient(135deg,#7c2d12,#b91c1c)", textColor: "#fff7ed", accentColor: "#fdba74", accent2Color: "#fb923c", mutedColor: "#fed7aa", chipBg: "rgba(253,186,116,0.15)", photoFrom: "#fdba74", photoTo: "#c2410c" }} />;

// Family J — Magazine (4): vintageblue, newsprint, parchment, typewriter
const VintageBlueTemplate = ({ data }) => <MagazineTemplate data={data} theme={{ fontDefault: "'Courier New',monospace", bg: "#eef2f7", textColor: "#1e2a3a", accentColor: "#1d4ed8", mutedColor: "#64748b" }} />;
const NewsprintTemplate = ({ data }) => <MagazineTemplate data={data} theme={{ fontDefault: "Georgia,serif", bg: "#f4f4f5", textColor: "#27272a", accentColor: "#3f3f46", mutedColor: "#71717a" }} />;
const ParchmentTemplate = ({ data }) => <MagazineTemplate data={data} theme={{ fontDefault: "Garamond,serif", bg: "#f3ead8", textColor: "#3a2a1a", accentColor: "#92400e", mutedColor: "#92765a" }} />;
const TypewriterTemplate = ({ data }) => <MagazineTemplate data={data} theme={{ fontDefault: "'Courier New',monospace", bg: "#ffffff", textColor: "#18181b", accentColor: "#18181b", mutedColor: "#71717a" }} />;

export const extraTemplateMap = {
  slate: SlateTemplate,
  ivory: IvoryTemplate,
  crimson: CrimsonTemplate,
  azure: AzureTemplate,
  midnight: MidnightTemplate,
  emerald: EmeraldTemplate,
  coral: CoralTemplate,
  graphite: GraphiteTemplate,
  blossom: BlossomTemplate,
  lavender: LavenderTemplate,
  citrus: CitrusTemplate,
  mint: MintTemplate,
  obsidian: ObsidianTemplate,
  burgundy: BurgundyTemplate,
  tealside: TealSideTemplate,
  charcoal: CharcoalTemplate,
  rosegold: RoseGoldTemplate,
  platinum: PlatinumTemplate,
  ambernoir: AmberNoirTemplate,
  sapphire: SapphireTemplate,
  violetneon: VioletNeonTemplate,
  amberneon: AmberNeonTemplate,
  blueneon: BlueNeonTemplate,
  redneon: RedNeonTemplate,
  ocean: OceanTemplate,
  berry: BerryTemplate,
  autumn: AutumnTemplate,
  tropical: TropicalTemplate,
  oceancard: OceanCardTemplate,
  plum: PlumTemplate,
  slatecard: SlateCardTemplate,
  terracotta: TerracottaTemplate,
  nebula: NebulaTemplate,
  galaxy: GalaxyTemplate,
  cosmic: CosmicTemplate,
  solar: SolarTemplate,
  vintageblue: VintageBlueTemplate,
  newsprint: NewsprintTemplate,
  parchment: ParchmentTemplate,
  typewriter: TypewriterTemplate,
};

// Daftar metadata ringan dipakai oleh templates-meta.jsx untuk thumbnail picker
export const extraTemplateInfo = {
  slate: { name: "Slate", tag: "Monokrom Bersih", hasPhoto: false, accent: "from-slate-500 to-slate-700", bg: "#f8fafc", fg: "#475569" , dark: false },
  ivory: { name: "Ivory Classic", tag: "Klasik Krem", hasPhoto: false, accent: "from-amber-700 to-amber-900", bg: "#fffdf7", fg: "#92400e" , dark: false },
  crimson: { name: "Crimson Classic", tag: "Merah Klasik", hasPhoto: false, accent: "from-red-700 to-red-900", bg: "#fff", fg: "#b91c1c" , dark: false },
  azure: { name: "Azure Clean", tag: "Biru Minimal", hasPhoto: false, accent: "from-sky-500 to-sky-700", bg: "#f8fafc", fg: "#0284c7" , dark: false },
  midnight: { name: "Midnight Tech", tag: "Ungu Gelap", hasPhoto: true, accent: "from-purple-700 to-indigo-900", bg: "#0f0f1a", fg: "#a855f7" , dark: true },
  emerald: { name: "Emerald Pro", tag: "Hijau Profesional", hasPhoto: false, accent: "from-emerald-700 to-emerald-900", bg: "#f0fdf9", fg: "#059669" , dark: false },
  coral: { name: "Coral Wave", tag: "Coral Hangat", hasPhoto: true, accent: "from-rose-500 to-orange-400", bg: "#fff5f5", fg: "#e11d48" , dark: false },
  graphite: { name: "Graphite", tag: "Abu Gelap", hasPhoto: false, accent: "from-zinc-600 to-zinc-800", bg: "#18181b", fg: "#a1a1aa" , dark: true },
  blossom: { name: "Blossom", tag: "Pink Pastel", hasPhoto: true, accent: "from-rose-400 to-orange-300", bg: "#fff1f2", fg: "#e11d48" , dark: false },
  lavender: { name: "Lavender Dream", tag: "Ungu Pastel", hasPhoto: true, accent: "from-violet-500 to-indigo-400", bg: "#f5f3ff", fg: "#7c3aed" , dark: false },
  citrus: { name: "Citrus Pop", tag: "Kuning Cerah", hasPhoto: true, accent: "from-amber-500 to-orange-400", bg: "#fefce8", fg: "#ca8a04" , dark: false },
  mint: { name: "Mint Fresh", tag: "Hijau Mint", hasPhoto: true, accent: "from-teal-500 to-emerald-400", bg: "#f0fdfa", fg: "#0d9488" , dark: false },
  obsidian: { name: "Obsidian Sidebar", tag: "Hitam Tegas", hasPhoto: true, accent: "from-neutral-800 to-black", bg: "#0a0a0a", fg: "#a1a1aa" , dark: true },
  burgundy: { name: "Burgundy Exec", tag: "Merah Eksekutif", hasPhoto: true, accent: "from-red-800 to-red-950", bg: "#450a0a", fg: "#fca5a5" , dark: true },
  tealside: { name: "Teal Sidebar", tag: "Teal Segar", hasPhoto: true, accent: "from-teal-700 to-teal-900", bg: "#134e4a", fg: "#5eead4" , dark: true },
  charcoal: { name: "Charcoal Pro", tag: "Abu Profesional", hasPhoto: true, accent: "from-slate-700 to-slate-900", bg: "#1e293b", fg: "#94a3b8" , dark: true },
  rosegold: { name: "Rose Gold", tag: "Mewah Pink-Emas", hasPhoto: false, accent: "from-rose-400 to-amber-300", bg: "#2a1a1f", fg: "#e8a0bc" , dark: true },
  platinum: { name: "Platinum", tag: "Mewah Silver", hasPhoto: false, accent: "from-gray-400 to-gray-600", bg: "#1c1c1e", fg: "#c7c7cc" , dark: true },
  ambernoir: { name: "Amber Noir", tag: "Mewah Oranye-Hitam", hasPhoto: false, accent: "from-amber-600 to-amber-800", bg: "#1a1207", fg: "#e09b3d" , dark: true },
  sapphire: { name: "Sapphire Luxury", tag: "Mewah Biru-Emas", hasPhoto: false, accent: "from-blue-500 to-blue-800", bg: "#0a1530", fg: "#7eb6f6" , dark: true },
  violetneon: { name: "Violet Pulse", tag: "Neon Ungu", hasPhoto: true, accent: "from-fuchsia-500 to-purple-700", bg: "#0a0014", fg: "#e879f9" , dark: true },
  amberneon: { name: "Amber Circuit", tag: "Neon Kuning", hasPhoto: true, accent: "from-amber-400 to-amber-700", bg: "#140a00", fg: "#fbbf24" , dark: true },
  blueneon: { name: "Cyber Blue", tag: "Neon Biru", hasPhoto: true, accent: "from-sky-400 to-sky-700", bg: "#00060f", fg: "#7dd3fc" , dark: true },
  redneon: { name: "Neon Red Alert", tag: "Neon Merah", hasPhoto: true, accent: "from-red-400 to-red-700", bg: "#0f0000", fg: "#fca5a5" , dark: true },
  ocean: { name: "Ocean Breeze", tag: "Gradien Biru-Teal", hasPhoto: true, accent: "from-sky-700 to-cyan-600", bg: "#f0f9ff", fg: "#0369a1" , dark: false },
  berry: { name: "Berry Smoothie", tag: "Gradien Ungu-Pink", hasPhoto: true, accent: "from-purple-700 to-fuchsia-600", bg: "#fdf4ff", fg: "#a21caf" , dark: false },
  autumn: { name: "Autumn Glow", tag: "Gradien Coklat-Oranye", hasPhoto: true, accent: "from-orange-800 to-amber-600", bg: "#fffbeb", fg: "#b45309" , dark: false },
  tropical: { name: "Tropical Sunset", tag: "Gradien Pink-Kuning", hasPhoto: true, accent: "from-pink-600 to-amber-400", bg: "#fff7f0", fg: "#db2777" , dark: false },
  oceancard: { name: "Oceanic", tag: "Biru Solid + Kartu", hasPhoto: false, accent: "from-sky-700 to-sky-900", bg: "#f0f9ff", fg: "#075985" , dark: false },
  plum: { name: "Plum Garden", tag: "Ungu Solid + Kartu", hasPhoto: false, accent: "from-purple-700 to-purple-900", bg: "#faf5ff", fg: "#6b21a8" , dark: false },
  slatecard: { name: "Slate Cards", tag: "Abu Solid + Kartu", hasPhoto: false, accent: "from-slate-600 to-slate-800", bg: "#f8fafc", fg: "#334155" , dark: false },
  terracotta: { name: "Terracotta", tag: "Coklat Solid + Kartu", hasPhoto: false, accent: "from-orange-800 to-orange-950", bg: "#fff7ed", fg: "#9a3412" , dark: false },
  nebula: { name: "Nebula", tag: "Gradien Ungu-Magenta", hasPhoto: true, accent: "from-purple-700 to-pink-700", bg: "#581c87", fg: "#f0abfc" , dark: true },
  galaxy: { name: "Galaxy Deep", tag: "Gradien Biru Tua", hasPhoto: true, accent: "from-indigo-900 to-indigo-700", bg: "#1e1b4b", fg: "#a5b4fc" , dark: true },
  cosmic: { name: "Cosmic Teal", tag: "Gradien Biru-Teal", hasPhoto: true, accent: "from-cyan-700 to-teal-700", bg: "#0c4a6e", fg: "#67e8f9" , dark: true },
  solar: { name: "Solar Flare", tag: "Gradien Oranye-Merah", hasPhoto: true, accent: "from-orange-800 to-red-700", bg: "#7c2d12", fg: "#fdba74" , dark: true },
  vintageblue: { name: "Vintage Blue Print", tag: "Cetak Biru Vintage", hasPhoto: false, accent: "from-blue-700 to-blue-900", bg: "#eef2f7", fg: "#1d4ed8" , dark: false },
  newsprint: { name: "Newsprint Gray", tag: "Koran Klasik", hasPhoto: false, accent: "from-zinc-600 to-zinc-800", bg: "#f4f4f5", fg: "#3f3f46" , dark: false },
  parchment: { name: "Parchment Sepia", tag: "Sepia Antik", hasPhoto: false, accent: "from-amber-700 to-amber-900", bg: "#f3ead8", fg: "#92400e" , dark: false },
  typewriter: { name: "Typewriter Mono", tag: "Mesin Tik Klasik", hasPhoto: false, accent: "from-zinc-700 to-zinc-900", bg: "#ffffff", fg: "#18181b" , dark: false },
};
