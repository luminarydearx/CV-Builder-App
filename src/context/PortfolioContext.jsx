"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { randomSectionIcon } from "@/lib/section-icons";

const AUTOSAVE_KEY = "portoinstant_autosave";
const DRAFTS_KEY = "portoinstant_drafts";

export const defaultData = {
  name: "",
  title: "",
  bio: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  linkedin: "",
  github: "",
  avatar: "",
  skills: [],
  projects: [],
  experience: [],
  education: [],
  selectedTemplate: "minimal",
  // Kosong = pakai font bawaan masing-masing template (Georgia/Courier
  // New/dst, sesuai desain aslinya). Begitu user pilih font dari dropdown
  // di Builder, nilai ini terisi dan akan menimpa font SEMUA template.
  fontFamily: "",
  // null = pakai warna asli template. Begitu user pilih preset atau atur
  // warna manual di Builder, object ini terisi {accent, accent2, bg,
  // surface, text, muted} dan menimpa warna SEMUA template.
  customColors: null,
  // Section custom yang ditambahkan user sendiri (mis. "Sertifikasi",
  // "Bahasa", "Volunteer"). Setiap section: { id, title, icon, items: [...] }
  // items: { id, heading, subheading, period, description }
  customSections: [],
};

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  // Initialize identically on server and client (Next.js server-renders
  // Client Components for the initial HTML too). localStorage only exists
  // in the browser, so the real autosave/drafts are pulled in right after
  // mount below -- reading it directly inside useState's initializer would
  // make the server's HTML and the browser's first paint disagree, which
  // triggers a hydration mismatch.
  const [data, setData] = useState(defaultData);
  const [drafts, setDrafts] = useState([]);
  const [currentDraftName, setCurrentDraftName] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTOSAVE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setData({ ...defaultData, ...parsed });
        setCurrentDraftName(parsed._draftName || null);
      }
    } catch {
      // corrupt autosave, fall back to defaultData silently
    }
    try {
      const savedDrafts = localStorage.getItem(DRAFTS_KEY);
      setDrafts(savedDrafts ? JSON.parse(savedDrafts) : []);
    } catch {
      setDrafts([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const toSave = { ...data, _draftName: currentDraftName };
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(toSave));
      setLastSaved(new Date());
    } catch {
      console.warn("Autosave gagal");
    }
  }, [data, currentDraftName, hydrated]);

  const updateField = useCallback((field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateArrayField = useCallback((field, index, value) => {
    setData((prev) => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  }, []);

  const addArrayItem = useCallback((field, item) => {
    setData((prev) => ({ ...prev, [field]: [...prev[field], item] }));
  }, []);

  const removeArrayItem = useCallback((field, index) => {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  }, []);

  const saveDraft = useCallback(
    (draftName) => {
      const trimmed = draftName.trim();
      if (!trimmed) return { success: false, message: "Nama draft tidak boleh kosong" };

      let isUpdate = false;

      setDrafts((prev) => {
        const existingIdx = prev.findIndex(
          (d) => d.name.toLowerCase() === trimmed.toLowerCase()
        );
        let updated;
        if (existingIdx !== -1) {
          isUpdate = true;
          updated = [...prev];
          updated[existingIdx] = {
            ...updated[existingIdx],
            data: { ...data },
            savedAt: new Date().toISOString(),
          };
        } else {
          updated = [
            ...prev,
            {
              id: Date.now().toString(),
              name: trimmed,
              data: { ...data },
              savedAt: new Date().toISOString(),
            },
          ];
        }
        try {
          localStorage.setItem(DRAFTS_KEY, JSON.stringify(updated));
        } catch {
          console.warn("Gagal simpan draft ke localStorage");
        }
        return updated;
      });

      setCurrentDraftName(trimmed);
      return {
        success: true,
        message: isUpdate
          ? `Draft "${trimmed}" diperbarui`
          : `Draft "${trimmed}" berhasil disimpan`,
      };
    },
    [data]
  );

  const loadDraft = useCallback(
    (draftId) => {
      const draft = drafts.find((d) => d.id === draftId);
      if (!draft) return { success: false, message: "Draft tidak ditemukan" };
      setData({ ...defaultData, ...draft.data });
      setCurrentDraftName(draft.name);
      return { success: true, message: `Draft "${draft.name}" berhasil dimuat` };
    },
    [drafts]
  );

  const deleteDraft = useCallback(
    (draftId) => {
      const draft = drafts.find((d) => d.id === draftId);
      setDrafts((prev) => {
        const updated = prev.filter((d) => d.id !== draftId);
        try {
          localStorage.setItem(DRAFTS_KEY, JSON.stringify(updated));
        } catch {
          console.warn("Gagal hapus draft");
        }
        return updated;
      });
      if (draft && draft.name === currentDraftName) {
        setCurrentDraftName(null);
      }
      return { success: true, message: `Draft "${draft?.name}" dihapus` };
    },
    [drafts, currentDraftName]
  );

  const renameDraft = useCallback(
    (draftId, newName) => {
      const trimmed = newName.trim();
      if (!trimmed) return { success: false, message: "Nama tidak boleh kosong" };
      const duplicate = drafts.find(
        (d) => d.name.toLowerCase() === trimmed.toLowerCase() && d.id !== draftId
      );
      if (duplicate) return { success: false, message: "Nama draft sudah dipakai" };

      const oldName = drafts.find((d) => d.id === draftId)?.name;

      setDrafts((prev) => {
        const updated = prev.map((d) => (d.id === draftId ? { ...d, name: trimmed } : d));
        try {
          localStorage.setItem(DRAFTS_KEY, JSON.stringify(updated));
        } catch {
          console.warn("Gagal rename draft");
        }
        return updated;
      });

      if (oldName === currentDraftName) setCurrentDraftName(trimmed);
      return { success: true, message: `Draft diubah menjadi "${trimmed}"` };
    },
    [drafts, currentDraftName]
  );

  const newDraft = useCallback(() => {
    setData({ ...defaultData });
    setCurrentDraftName(null);
  }, []);

  // ── Custom sections (additif, tidak mengubah method di atas) ──
  const addCustomSection = useCallback((title) => {
    const trimmed = (title || "Section Baru").trim() || "Section Baru";
    setData((prev) => ({
      ...prev,
      customSections: [
        ...prev.customSections,
        {
          id: Date.now().toString(),
          title: trimmed,
          icon: randomSectionIcon(),
          items: [],
        },
      ],
    }));
  }, []);

  const removeCustomSection = useCallback((sectionId) => {
    setData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((s) => s.id !== sectionId),
    }));
  }, []);

  const updateCustomSectionMeta = useCallback((sectionId, patch) => {
    setData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) =>
        s.id === sectionId ? { ...s, ...patch } : s
      ),
    }));
  }, []);

  const addCustomSectionItem = useCallback((sectionId, item) => {
    setData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) =>
        s.id === sectionId
          ? { ...s, items: [...s.items, { id: Date.now().toString(), ...item }] }
          : s
      ),
    }));
  }, []);

  const updateCustomSectionItem = useCallback((sectionId, itemId, patch) => {
    setData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map((it) => (it.id === itemId ? { ...it, ...patch } : it)),
            }
          : s
      ),
    }));
  }, []);

  const removeCustomSectionItem = useCallback((sectionId, itemId) => {
    setData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.filter((it) => it.id !== itemId) }
          : s
      ),
    }));
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        setData,
        drafts,
        currentDraftName,
        lastSaved,
        updateField,
        updateArrayField,
        addArrayItem,
        removeArrayItem,
        saveDraft,
        loadDraft,
        deleteDraft,
        renameDraft,
        newDraft,
        addCustomSection,
        removeCustomSection,
        updateCustomSectionMeta,
        addCustomSectionItem,
        updateCustomSectionItem,
        removeCustomSectionItem,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
};
