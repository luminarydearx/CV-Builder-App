"use client";

import { useState, useRef, useEffect } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  Save,
  FolderOpen,
  Trash2,
  Edit3,
  Plus,
  Check,
  X,
  Clock,
  FileText,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const DraftManager = () => {
  const {
    drafts,
    currentDraftName,
    lastSaved,
    saveDraft,
    loadDraft,
    deleteDraft,
    renameDraft,
    newDraft,
    data,
  } = usePortfolio();

  const [isOpen, setIsOpen] = useState(false);
  const [saveInput, setSaveInput] = useState("");
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [renamingId, setRenamingId] = useState(null);
  const [renameInput, setRenameInput] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSave = () => {
    const name = saveInput.trim() || currentDraftName;
    if (!name) {
      setShowSaveInput(true);
      return;
    }
    const result = saveDraft(name);
    if (result.success) {
      toast.success(result.message);
      setSaveInput("");
      setShowSaveInput(false);
    } else {
      toast.error(result.message);
    }
  };

  const handleSaveNew = () => {
    if (!saveInput.trim()) {
      toast.error("Masukkan nama draft terlebih dahulu");
      return;
    }
    const result = saveDraft(saveInput.trim());
    if (result.success) {
      toast.success(result.message);
      setSaveInput("");
      setShowSaveInput(false);
    } else {
      toast.error(result.message);
    }
  };

  const handleLoad = (draftId) => {
    const result = loadDraft(draftId);
    if (result.success) {
      toast.success(result.message);
      setIsOpen(false);
    } else {
      toast.error(result.message);
    }
  };

  const handleDelete = (draftId) => {
    const result = deleteDraft(draftId);
    if (result.success) {
      toast.success(result.message);
      setConfirmDeleteId(null);
    }
  };

  const handleRename = (draftId) => {
    if (!renameInput.trim()) {
      toast.error("Nama tidak boleh kosong");
      return;
    }
    const result = renameDraft(draftId, renameInput.trim());
    if (result.success) {
      toast.success(result.message);
      setRenamingId(null);
      setRenameInput("");
    } else {
      toast.error(result.message);
    }
  };

  const handleNewDraft = () => {
    newDraft();
    toast("Draft baru dimulai", { icon: "📄" });
    setIsOpen(false);
  };

  const closeAll = () => {
    setIsOpen(false);
    setShowSaveInput(false);
    setSaveInput("");
    setRenamingId(null);
    setRenameInput("");
    setConfirmDeleteId(null);
  };

  // Mobile: render as bottom sheet, Desktop: render as dropdown
  const dropdownContent = (type) => {
    if (type === "save") {
      return (
        <div
          className="glass-strong rounded-xl p-4 border border-gold-400/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
          style={{ backgroundColor: "rgba(10, 15, 40, 0.97)" }}
        >
          <p className="text-xs font-semibold text-white/70 mb-3 flex items-center gap-2">
            <Save size={12} className="text-gold-400" />
            Simpan sebagai Draft
          </p>
          <input
            type="text"
            className="input-field text-sm mb-3"
            placeholder='Nama draft (contoh: "Dearly" atau "Template Kerja")'
            value={saveInput}
            onChange={(e) => setSaveInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSaveNew()}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleSaveNew}
              className="btn-primary flex-1 text-xs py-2 flex items-center justify-center gap-1.5"
            >
              <Check size={12} />
              Simpan
            </button>
            <button
              onClick={() => {
                setShowSaveInput(false);
                setSaveInput("");
              }}
              className="btn-ghost text-xs py-2 px-3"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      );
    }

    // Draft list panel
    return (
      <div
        className="glass-strong rounded-xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        style={{ backgroundColor: "rgba(10, 15, 40, 0.97)" }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
          <p className="text-xs font-semibold text-white/60 flex items-center gap-2">
            <FolderOpen size={12} className="text-gold-400" />
            Draft Tersimpan ({drafts.length})
          </p>
          <button
            onClick={handleNewDraft}
            className="text-xs text-gold-400/70 hover:text-gold-400 flex items-center gap-1 transition-colors"
          >
            <Plus size={11} />
            Baru
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto overscroll-contain">
          {drafts.length === 0 ? (
            <div className="py-8 text-center">
              <FileText size={20} className="text-white/15 mx-auto mb-2" />
              <p className="text-white/25 text-xs">Belum ada draft tersimpan</p>
              <p className="text-white/15 text-xs mt-1">
                Klik "Simpan Draft" untuk menyimpan
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className={`px-4 py-3 transition-colors ${
                    currentDraftName === draft.name
                      ? "bg-gold-400/[0.06]"
                      : "hover:bg-white/[0.03]"
                  }`}
                >
                  {renamingId === draft.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input-field text-xs py-1.5 flex-1"
                        value={renameInput}
                        onChange={(e) => setRenameInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRename(draft.id);
                          if (e.key === "Escape") {
                            setRenamingId(null);
                            setRenameInput("");
                          }
                        }}
                        autoFocus
                      />
                      <button
                        onClick={() => handleRename(draft.id)}
                        className="text-gold-400 hover:text-gold-300 transition-colors"
                      >
                        <Check size={13} />
                      </button>
                      <button
                        onClick={() => {
                          setRenamingId(null);
                          setRenameInput("");
                        }}
                        className="text-white/30 hover:text-white/60 transition-colors"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ) : confirmDeleteId === draft.id ? (
                    <div>
                      <p className="text-xs text-white/60 mb-2 flex items-center gap-1.5">
                        <AlertCircle size={11} className="text-red-400" />
                        Hapus draft "{draft.name}"?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(draft.id)}
                          className="flex-1 text-xs py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors"
                        >
                          Ya, Hapus
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="flex-1 text-xs py-1.5 btn-ghost"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white/80 truncate">
                            {draft.name}
                          </p>
                          {currentDraftName === draft.name && (
                            <span className="flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-gold-400/15 text-gold-400 font-medium">
                              Aktif
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-[11px] text-white/25">
                            {formatDate(draft.savedAt)}
                          </p>
                          {draft.data.name && (
                            <p className="text-[11px] text-white/20 truncate">
                              · {draft.data.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleLoad(draft.id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-gold-400 hover:bg-gold-400/10 transition-all"
                          title="Muat draft"
                        >
                          <FolderOpen size={13} />
                        </button>
                        <button
                          onClick={() => {
                            setRenamingId(draft.id);
                            setRenameInput(draft.name);
                          }}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.05] transition-all"
                          title="Rename"
                        >
                          <Edit3 size={12} />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(draft.id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all"
                          title="Hapus"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {drafts.length > 0 && (
          <div className="px-4 py-2.5 border-t border-white/[0.04]">
            <p className="text-[10px] text-white/20 text-center">
              Data tersimpan di browser · Tidak hilang saat reload
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="relative" ref={containerRef}>
        <div className="flex items-center gap-2">
          {lastSaved && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/25">
              <Clock size={11} />
              <span>
                Tersimpan{" "}
                {lastSaved.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          )}

          {currentDraftName && (
            <div className="hidden sm:flex items-center gap-1.5 tag-chip text-xs py-1">
              <FileText size={10} />
              {currentDraftName}
            </div>
          )}

          {currentDraftName ? (
            <button
              onClick={handleSave}
              className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
              title={`Simpan ke "${currentDraftName}"`}
            >
              <Save size={12} />
              Simpan
            </button>
          ) : (
            <button
              onClick={() => {
                setShowSaveInput(true);
                setIsOpen(false);
              }}
              className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
            >
              <Save size={12} />
              Simpan Draft
            </button>
          )}

          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setShowSaveInput(false);
              setSaveInput("");
            }}
            className="btn-ghost text-xs py-1.5 px-3 flex items-center gap-1.5"
          >
            <FolderOpen size={12} />
            <span className="hidden sm:inline">Draft</span>
            {drafts.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-gold-400/20 text-gold-400 text-[10px] flex items-center justify-center font-mono">
                {drafts.length}
              </span>
            )}
            {isOpen ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          </button>
        </div>

        {/* Desktop dropdowns - positioned relative to button row */}
        {!isMobile && showSaveInput && (
          <div className="absolute right-0 top-full mt-2 z-50 w-72">
            {dropdownContent("save")}
          </div>
        )}

        {!isMobile && isOpen && (
          <div className="absolute right-0 top-full mt-2 z-50 w-80">
            {dropdownContent("list")}
          </div>
        )}
      </div>

      {/* Mobile: Bottom Sheet overlays */}
      {isMobile && (showSaveInput || isOpen) && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={closeAll}
          />

          {/* Bottom Sheet */}
          <div
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl overflow-hidden"
            style={{
              backgroundColor: "rgba(10, 15, 40, 0.99)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 -20px 60px rgba(0,0,0,0.8)",
              maxHeight: "80vh",
            }}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            <div
              className="px-4 pb-safe overflow-y-auto"
              style={{ maxHeight: "calc(80vh - 32px)" }}
            >
              {showSaveInput ? (
                <div className="py-4">
                  <p className="text-xs font-semibold text-white/70 mb-3 flex items-center gap-2">
                    <Save size={12} className="text-gold-400" />
                    Simpan sebagai Draft
                  </p>
                  <input
                    type="text"
                    className="input-field text-sm mb-3"
                    placeholder='Nama draft (contoh: "Dearly" atau "Template Kerja")'
                    value={saveInput}
                    onChange={(e) => setSaveInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveNew()}
                    autoFocus
                  />
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={handleSaveNew}
                      className="btn-primary flex-1 text-xs py-2.5 flex items-center justify-center gap-1.5"
                    >
                      <Check size={12} />
                      Simpan
                    </button>
                    <button
                      onClick={() => {
                        setShowSaveInput(false);
                        setSaveInput("");
                      }}
                      className="btn-ghost text-xs py-2.5 px-4"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-2">
                  <div className="flex items-center justify-between py-3 border-b border-white/[0.06] mb-1">
                    <p className="text-xs font-semibold text-white/60 flex items-center gap-2">
                      <FolderOpen size={12} className="text-gold-400" />
                      Draft Tersimpan ({drafts.length})
                    </p>
                    <button
                      onClick={handleNewDraft}
                      className="text-xs text-gold-400/70 hover:text-gold-400 flex items-center gap-1 transition-colors"
                    >
                      <Plus size={11} />
                      Baru
                    </button>
                  </div>

                  {drafts.length === 0 ? (
                    <div className="py-10 text-center">
                      <FileText
                        size={24}
                        className="text-white/15 mx-auto mb-2"
                      />
                      <p className="text-white/25 text-sm">
                        Belum ada draft tersimpan
                      </p>
                      <p className="text-white/15 text-xs mt-1">
                        Klik "Simpan Draft" untuk menyimpan
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-white/[0.04]">
                      {drafts.map((draft) => (
                        <div
                          key={draft.id}
                          className={`py-3 transition-colors ${
                            currentDraftName === draft.name
                              ? "bg-gold-400/[0.06]"
                              : ""
                          }`}
                        >
                          {renamingId === draft.id ? (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                className="input-field text-xs py-2 flex-1"
                                value={renameInput}
                                onChange={(e) => setRenameInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleRename(draft.id);
                                  if (e.key === "Escape") {
                                    setRenamingId(null);
                                    setRenameInput("");
                                  }
                                }}
                                autoFocus
                              />
                              <button
                                onClick={() => handleRename(draft.id)}
                                className="text-gold-400 hover:text-gold-300 transition-colors p-2"
                              >
                                <Check size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  setRenamingId(null);
                                  setRenameInput("");
                                }}
                                className="text-white/30 hover:text-white/60 transition-colors p-2"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ) : confirmDeleteId === draft.id ? (
                            <div>
                              <p className="text-sm text-white/60 mb-3 flex items-center gap-1.5">
                                <AlertCircle
                                  size={13}
                                  className="text-red-400"
                                />
                                Hapus draft "{draft.name}"?
                              </p>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleDelete(draft.id)}
                                  className="flex-1 text-sm py-2.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors"
                                >
                                  Ya, Hapus
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="flex-1 text-sm py-2.5 btn-ghost"
                                >
                                  Batal
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-medium text-white/80 truncate">
                                    {draft.name}
                                  </p>
                                  {currentDraftName === draft.name && (
                                    <span className="flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-gold-400/15 text-gold-400 font-medium">
                                      Aktif
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-white/25 mt-0.5">
                                  {formatDate(draft.savedAt)}
                                  {draft.data.name && ` · ${draft.data.name}`}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <button
                                  onClick={() => handleLoad(draft.id)}
                                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/30 hover:text-gold-400 hover:bg-gold-400/10 transition-all"
                                  title="Muat draft"
                                >
                                  <FolderOpen size={15} />
                                </button>
                                <button
                                  onClick={() => {
                                    setRenamingId(draft.id);
                                    setRenameInput(draft.name);
                                  }}
                                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.05] transition-all"
                                  title="Rename"
                                >
                                  <Edit3 size={14} />
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteId(draft.id)}
                                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                  title="Hapus"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {drafts.length > 0 && (
                    <div className="py-3 border-t border-white/[0.04] mt-1 mb-2">
                      <p className="text-[10px] text-white/20 text-center">
                        Data tersimpan di browser · Tidak hilang saat reload
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DraftManager;