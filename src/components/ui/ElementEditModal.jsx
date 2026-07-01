"use client";

import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import {
  X,
  Type,
  ImagePlus,
  RotateCcw,
  Trash2,
  Move,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Info,
} from "lucide-react";
import { allTemplateMap } from "@/lib/all-templates";
import { RESUME_WIDTH } from "@/lib/cv-templates";
import { usePortfolio } from "@/context/PortfolioContext";

const FIELD_LABELS = {
  photo: "Foto",
  name: "Nama",
  title: "Jabatan",
  bio: "Bio",
};

const NUDGE_STEP = 4;

/**
 * Modal editor visual fullscreen. Cara kerja "hitbox":
 * 1. Render template CV yang SAMA persis seperti preview/PDF (komponen
 *    asli dari allTemplateMap), di dalam container yang di-scale.
 * 2. Elemen yang bisa diedit ditandai `data-edit-id` di kode template
 *    (lihat EditableText/PhotoOrInitial/FreeElementsLayer di
 *    cv-templates.jsx). Setelah render, kita scan DOM untuk semua node
 *    `[data-edit-id]` dan hitung posisi layar persisnya lewat
 *    getBoundingClientRect() -- ini otomatis benar untuk struktur layout
 *    APAPUN (flex, grid, sidebar, dst) tanpa perlu tahu detail tiap
 *    template satu-satu.
 * 3. Hitbox transparan digambar persis di atas posisi itu, bisa di-drag
 *    (untuk geser posisi) dan diklik (untuk buka panel kontrol warna/
 *    ukuran/hapus di samping).
 * 4. Perubahan disimpan ke data.elementOverrides (untuk elemen bawaan
 *    template) atau data.freeElements (untuk teks/gambar yang ditambah
 *    user sendiri) -- keduanya otomatis ikut ke PDF karena PDF & preview
 *    merender komponen yang sama persis.
 */
export default function ElementEditModal({ onClose }) {
  const {
    data,
    setElementOverride,
    resetElementOverride,
    resetAllElementOverrides,
    addFreeElement,
    updateFreeElement,
    removeFreeElement,
  } = usePortfolio();

  const stageOuterRef = useRef(null);
  const stageInnerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [scale, setScale] = useState(0.6);
  const [hitboxes, setHitboxes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const dragState = useRef(null);

  const TemplateComponent = allTemplateMap[data.selectedTemplate];
  const templateId = data.selectedTemplate;

  useEffect(() => {
    const el = stageOuterRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      if (w > 0) setScale(Math.min(w / RESUME_WIDTH, 0.85));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const recomputeHitboxes = useCallback(() => {
    const container = stageInnerRef.current;
    if (!container) return;
    // PENTING: querySelectorAll di-scope ke `container` (stageInnerRef),
    // BUKAN ke document. Template yang sama juga dirender di preview
    // Builder di belakang modal ini, jadi query yang tidak di-scope akan
    // menangkap elemen [data-edit-id] duplikat dari tempat yang salah.
    const nodes = container.querySelectorAll("[data-edit-id]");
    const containerRect = container.getBoundingClientRect();
    const boxes = [];
    nodes.forEach((node) => {
      const r = node.getBoundingClientRect();
      const id = node.getAttribute("data-edit-id");
      const isFree = node.getAttribute("data-free-element") === "true";
      boxes.push({
        id,
        isFree,
        kind: isFree ? (node.tagName === "IMG" ? "image" : "text") : id === "photo" ? "photo" : "text",
        left: r.left - containerRect.left,
        top: r.top - containerRect.top,
        width: r.width,
        height: r.height,
      });
    });
    setHitboxes(boxes);
  }, []);

  useLayoutEffect(() => {
    recomputeHitboxes();
  }, [data, scale, recomputeHitboxes]);

  // Tetap pasang ResizeObserver di stage juga -- menangkap kasus ukuran
  // berubah TANPA data/scale berubah (mis. resize jendela browser manual).
  useEffect(() => {
    const container = stageInnerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => recomputeHitboxes());
    ro.observe(container);
    return () => ro.disconnect();
  }, [recomputeHitboxes]);

  // PENTING: ResizeObserver di atas hanya menangkap perubahan UKURAN, bukan
  // perubahan POSISI. Modal ini memuat font custom (next/font/google) untuk
  // chrome UI-nya sendiri (judul, label, dst) yang bisa selesai loading
  // SETELAH render pertama -- begitu font itu "swap" dari fallback ke font
  // asli, tinggi/lebar elemen di sekitar bisa berubah sedikit dan mendorong
  // posisi kanvas bergeser, padahal ukuran kanvas itu sendiri tidak berubah.
  // document.fonts.ready memberi sinyal pasti kapan ini selesai, dan
  // beberapa recompute susulan dengan delay singkat jadi jaring pengaman
  // untuk sumber pergeseran lain yang mungkin tidak tertangkap observer.
  useEffect(() => {
    let cancelled = false;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) recomputeHitboxes();
      });
    }
    const timers = [100, 350, 800].map((ms) => setTimeout(() => recomputeHitboxes(), ms));
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [recomputeHitboxes]);

  // ── Drag untuk geser posisi (hitbox bawaan: dx/dy; elemen bebas: x/y) ──
  const handlePointerDown = (e, box) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedId(box.id);
    const freeEl = box.isFree ? data.freeElements.find((f) => f.id === box.id) : null;
    const ov = !box.isFree ? data.elementOverrides?.[templateId]?.[box.id] : null;
    dragState.current = {
      id: box.id,
      isFree: box.isFree,
      startX: e.clientX,
      startY: e.clientY,
      startDx: ov?.dx || 0,
      startDy: ov?.dy || 0,
      origX: freeEl?.x || 0,
      origY: freeEl?.y || 0,
    };
  };

  useEffect(() => {
    const handleMove = (e) => {
      const ds = dragState.current;
      if (!ds) return;
      const dxCanvas = Math.round((e.clientX - ds.startX) / scale);
      const dyCanvas = Math.round((e.clientY - ds.startY) / scale);
      if (ds.isFree) {
        updateFreeElement(ds.id, { x: ds.origX + dxCanvas, y: ds.origY + dyCanvas });
      } else {
        setElementOverride(templateId, ds.id, { dx: ds.startDx + dxCanvas, dy: ds.startDy + dyCanvas });
      }
    };
    const handleUp = () => {
      dragState.current = null;
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [scale, templateId, setElementOverride, updateFreeElement]);

  const nudge = (dirX, dirY) => {
    const box = hitboxes.find((h) => h.id === selectedId);
    if (!box) return;
    if (box.isFree) {
      const el = data.freeElements.find((f) => f.id === selectedId);
      if (!el) return;
      updateFreeElement(selectedId, { x: (el.x || 0) + dirX * NUDGE_STEP, y: (el.y || 0) + dirY * NUDGE_STEP });
    } else {
      const ov = data.elementOverrides?.[templateId]?.[selectedId];
      setElementOverride(templateId, selectedId, {
        dx: (ov?.dx || 0) + dirX * NUDGE_STEP,
        dy: (ov?.dy || 0) + dirY * NUDGE_STEP,
      });
    }
  };

  const handleAddText = () => {
    const id = addFreeElement({
      type: "text",
      x: 280,
      y: 480,
      width: 240,
      content: "Teks baru",
      color: "#1e293b",
      fontSize: 14,
      fontWeight: 600,
      rotation: 0,
    });
    setSelectedId(id);
  };

  const handleAddImageClick = () => fileInputRef.current?.click();

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const id = addFreeElement({
        type: "image",
        x: 280,
        y: 480,
        width: 120,
        height: 120,
        src: ev.target.result,
        rotation: 0,
        borderRadius: 8,
      });
      setSelectedId(id);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const selectedBox = hitboxes.find((h) => h.id === selectedId);
  const selectedFreeEl = selectedBox?.isFree ? data.freeElements.find((f) => f.id === selectedId) : null;
  const selectedOverride = selectedBox && !selectedBox.isFree ? data.elementOverrides?.[templateId]?.[selectedId] : null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-lg text-white/90">Edit Tata Letak</h2>
          <span className="text-[11px] text-white/30 hidden sm:inline">
            Klik & geser kotak untuk pindah posisi. Klik sekali untuk buka kontrol.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => resetAllElementOverrides(templateId)}
            className="btn-ghost text-xs py-1.5 px-3 flex items-center gap-1.5"
            title="Kembalikan semua posisi bawaan ke default"
          >
            <RotateCcw size={12} />
            Reset Posisi
          </button>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors p-1.5">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Toolbar tambah elemen */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-white/10 flex-shrink-0">
        <button onClick={handleAddText} className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
          <Type size={13} />
          Tambah Teks
        </button>
        <button onClick={handleAddImageClick} className="btn-ghost text-xs py-2 px-4 flex items-center gap-1.5">
          <ImagePlus size={13} />
          Tambah Gambar
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
        <div className="flex items-center gap-1.5 text-[10px] text-white/25 ml-2">
          <Info size={11} />
          Elemen baru muncul di tengah kanvas, geser ke posisi yang diinginkan
        </div>
      </div>

      {/* Body: kanvas + panel kontrol */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto p-8 flex items-start justify-center" onClick={() => setSelectedId(null)}>
          <div ref={stageOuterRef} style={{ width: "100%", maxWidth: 760 }}>
            <div
              style={{
                position: "relative",
                width: RESUME_WIDTH * scale,
                margin: "0 auto",
              }}
            >
              <div
                ref={stageInnerRef}
                style={{
                  width: RESUME_WIDTH,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                }}
              >
                {TemplateComponent && <TemplateComponent data={data} />}
              </div>

              {/* Hitbox overlays */}
              {hitboxes.map((box) => (
                <div
                  key={box.id}
                  onPointerDown={(e) => handlePointerDown(e, box)}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: "absolute",
                    left: box.left,
                    top: box.top,
                    width: box.width,
                    height: box.height,
                    cursor: "move",
                    border:
                      selectedId === box.id
                        ? "2px solid #e8c96a"
                        : "1.5px dashed rgba(232,201,106,0.5)",
                    background: selectedId === box.id ? "rgba(232,201,106,0.12)" : "transparent",
                    borderRadius: box.kind === "photo" ? "50%" : 4,
                    transition: "background 0.15s",
                  }}
                  className="hover:bg-gold-400/10"
                  title={FIELD_LABELS[box.id] || (box.kind === "image" ? "Gambar" : "Teks")}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Panel kontrol kanan */}
        <div className="w-72 border-l border-white/10 flex-shrink-0 overflow-y-auto p-5">
          {!selectedBox && (
            <div className="text-center pt-10">
              <Move size={28} className="text-white/15 mx-auto mb-3" />
              <p className="text-xs text-white/30 leading-relaxed">
                Klik salah satu kotak putus-putus emas di kanvas untuk mulai mengatur posisi, warna, atau ukurannya.
              </p>
            </div>
          )}

          {selectedBox && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white/85">
                  {FIELD_LABELS[selectedId] ||
                    (selectedBox.kind === "image" ? "Gambar Custom" : "Teks Custom")}
                </h3>
                {selectedBox.isFree ? (
                  <button
                    onClick={() => {
                      removeFreeElement(selectedId);
                      setSelectedId(null);
                    }}
                    className="text-white/30 hover:text-red-400 transition-colors"
                    title="Hapus elemen"
                  >
                    <Trash2 size={15} />
                  </button>
                ) : (
                  <button
                    onClick={() => resetElementOverride(templateId, selectedId)}
                    className="text-white/30 hover:text-gold-400 transition-colors"
                    title="Reset posisi & warna elemen ini"
                  >
                    <RotateCcw size={14} />
                  </button>
                )}
              </div>

              {/* Nudge posisi */}
              <div>
                <label className="label-field mb-2">Posisi</label>
                <div className="grid grid-cols-3 gap-1.5 w-32">
                  <div />
                  <button onClick={() => nudge(0, -1)} className="btn-ghost p-2 flex items-center justify-center">
                    <ArrowUp size={13} />
                  </button>
                  <div />
                  <button onClick={() => nudge(-1, 0)} className="btn-ghost p-2 flex items-center justify-center">
                    <ArrowLeft size={13} />
                  </button>
                  <div className="flex items-center justify-center text-white/15 text-[9px]">{NUDGE_STEP}px</div>
                  <button onClick={() => nudge(1, 0)} className="btn-ghost p-2 flex items-center justify-center">
                    <ArrowRight size={13} />
                  </button>
                  <div />
                  <button onClick={() => nudge(0, 1)} className="btn-ghost p-2 flex items-center justify-center">
                    <ArrowDown size={13} />
                  </button>
                  <div />
                </div>
                <p className="text-[10px] text-white/25 mt-2">Atau langsung drag kotaknya di kanvas.</p>
              </div>

              {/* Konten teks (hanya elemen bebas bertipe teks) */}
              {selectedBox.isFree && selectedBox.kind === "text" && selectedFreeEl && (
                <div>
                  <label className="label-field mb-1.5">Isi Teks</label>
                  <textarea
                    id="free-element-content-input"
                    value={selectedFreeEl.content || ""}
                    onChange={(e) => updateFreeElement(selectedId, { content: e.target.value })}
                    className="input-field resize-none"
                    rows={3}
                  />
                </div>
              )}

              {/* Warna (teks bawaan + teks bebas) */}
              {selectedBox.kind === "text" && (
                <div>
                  <label className="label-field mb-1.5">Warna</label>
                  <input
                    type="color"
                    value={
                      selectedBox.isFree
                        ? selectedFreeEl?.color || "#1e293b"
                        : selectedOverride?.color || "#1e293b"
                    }
                    onChange={(e) =>
                      selectedBox.isFree
                        ? updateFreeElement(selectedId, { color: e.target.value })
                        : setElementOverride(templateId, selectedId, { color: e.target.value })
                    }
                    className="w-full h-9 rounded-lg cursor-pointer bg-transparent border border-white/10"
                  />
                </div>
              )}

              {/* Ukuran font (teks bebas) */}
              {selectedBox.isFree && selectedBox.kind === "text" && selectedFreeEl && (
                <div>
                  <label className="label-field mb-1.5">
                    Ukuran Teks ({selectedFreeEl.fontSize || 14}px)
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="48"
                    value={selectedFreeEl.fontSize || 14}
                    onChange={(e) => updateFreeElement(selectedId, { fontSize: parseInt(e.target.value, 10) })}
                    className="w-full accent-gold-400"
                  />
                </div>
              )}

              {/* Ukuran & rotasi gambar bebas */}
              {selectedBox.isFree && selectedBox.kind === "image" && selectedFreeEl && (
                <>
                  <div>
                    <label className="label-field mb-1.5">Ukuran ({selectedFreeEl.width || 120}px)</label>
                    <input
                      type="range"
                      min="30"
                      max="400"
                      value={selectedFreeEl.width || 120}
                      onChange={(e) => {
                        const w = parseInt(e.target.value, 10);
                        updateFreeElement(selectedId, { width: w, height: w });
                      }}
                      className="w-full accent-gold-400"
                    />
                  </div>
                  <div>
                    <label className="label-field mb-1.5">Rotasi ({selectedFreeEl.rotation || 0}°)</label>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={selectedFreeEl.rotation || 0}
                      onChange={(e) => updateFreeElement(selectedId, { rotation: parseInt(e.target.value, 10) })}
                      className="w-full accent-gold-400"
                    />
                  </div>
                  <div>
                    <label className="label-field mb-1.5">Bentuk Sudut ({selectedFreeEl.borderRadius ?? 8}px)</label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={selectedFreeEl.borderRadius ?? 8}
                      onChange={(e) => updateFreeElement(selectedId, { borderRadius: parseInt(e.target.value, 10) })}
                      className="w-full accent-gold-400"
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
