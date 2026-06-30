"use client";

import { useState, useRef, useEffect } from "react";
import { X, RotateCw, ZoomIn, Check, Move, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const VIEWPORT_SIZE = 280; // px, kotak crop yang dilihat user
const OUTPUT_SIZE = 480; // px, resolusi akhir foto yang disimpan

/**
 * Modal edit foto: user bisa geser (pan), zoom, dan rotasi BEBAS derajat
 * sebelum foto dipakai di CV. Hasil akhirnya di-"bake" jadi satu gambar
 * persegi lewat Canvas API lalu disimpan sebagai base64 ke field
 * `data.photo` -- persis seperti sebelumnya. Karena hasilnya tetap berupa
 * gambar statis biasa, template CV (preview & PDF) tidak perlu tahu
 * apa-apa soal crop/rotate ini, jadi sinkronisasi preview <-> PDF tidak
 * tersentuh sama sekali.
 */
export default function PhotoCropModal({ imageSrc, onApply, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [naturalSize, setNaturalSize] = useState(null);
  const dragRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
    setNaturalSize(null);

    // PENTING: kalau gambar ini SUDAH pernah ditampilkan browser sebelumnya
    // (misalnya saat klik ikon gunting untuk edit ulang foto yang sudah ada
    // -- foto itu sudah dirender di avatar kecil sebelum modal ini dibuka),
    // browser bisa saja sudah selesai resolve gambar tersebut SEBELUM React
    // memasang listener onLoad di bawah. Akibatnya onLoad tidak pernah
    // terpanggil dan naturalSize macet di null selamanya -- inilah yang
    // membuat tombol Terapkan terlihat "tidak ngapa-ngapain" saat diklik.
    // Cek img.complete langsung sebagai fallback untuk kasus ini.
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
    }
  }, [imageSrc]);

  const baseSize = (() => {
    if (!naturalSize) return { w: VIEWPORT_SIZE, h: VIEWPORT_SIZE };
    const scale = Math.max(VIEWPORT_SIZE / naturalSize.w, VIEWPORT_SIZE / naturalSize.h);
    return { w: naturalSize.w * scale, h: naturalSize.h * scale };
  })();

  const handlePointerDown = (e) => {
    e.preventDefault();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origOffset: { ...offset },
    };
  };
  const handlePointerMove = (e) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setOffset({
      x: dragRef.current.origOffset.x + dx,
      y: dragRef.current.origOffset.y + dy,
    });
  };
  const stopDrag = () => {
    dragRef.current = null;
  };

  const handleImageLoad = (e) => {
    setNaturalSize({ w: e.target.naturalWidth, h: e.target.naturalHeight });
  };

  const handleApply = () => {
    try {
      const img = imgRef.current;
      if (!img || !naturalSize) {
        toast.error("Foto belum siap, coba sebentar lagi.");
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.width = OUTPUT_SIZE;
      canvas.height = OUTPUT_SIZE;
      const ctx = canvas.getContext("2d");

      const scaleFactor = OUTPUT_SIZE / VIEWPORT_SIZE;
      const drawW = baseSize.w * zoom * scaleFactor;
      const drawH = baseSize.h * zoom * scaleFactor;

      ctx.save();
      ctx.translate(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(
        img,
        -drawW / 2 + offset.x * scaleFactor,
        -drawH / 2 + offset.y * scaleFactor,
        drawW,
        drawH
      );
      ctx.restore();

      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      onApply(dataUrl);
    } catch (err) {
      console.error("Gagal menerapkan crop foto:", err);
      toast.error("Gagal menerapkan foto. Coba upload ulang.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="glass-strong rounded-2xl p-6 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg text-white/90">Atur Foto</h3>
          <button type="button" onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div
          className="relative mx-auto rounded-full overflow-hidden border-2 border-gold-400/30 cursor-move select-none bg-black/30"
          style={{ width: VIEWPORT_SIZE, height: VIEWPORT_SIZE, touchAction: "none" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDrag}
          onPointerLeave={stopDrag}
        >
          <img
            ref={imgRef}
            src={imageSrc}
            alt="Crop preview"
            draggable={false}
            onLoad={handleImageLoad}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: baseSize.w,
              height: baseSize.h,
              transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg) scale(${zoom})`,
              pointerEvents: "none",
              maxWidth: "none",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
            <Move size={20} className="text-white/70" />
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label className="label-field flex items-center gap-1.5 mb-1.5">
              <ZoomIn size={12} /> Zoom
            </label>
            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full accent-gold-400"
            />
          </div>
          <div>
            <label className="label-field flex items-center gap-1.5 mb-1.5">
              <RotateCw size={12} /> Rotasi ({rotation}°)
            </label>
            <input
              type="range"
              min="-180"
              max="180"
              step="1"
              value={rotation}
              onChange={(e) => setRotation(parseInt(e.target.value, 10))}
              className="w-full accent-gold-400"
            />
          </div>
        </div>

        <p className="text-[11px] text-white/30 mt-3">
          Geser foto di dalam lingkaran untuk mengatur posisi.
        </p>

        <div className="flex gap-3 mt-5">
          <button type="button" onClick={onClose} className="btn-ghost flex-1 text-sm">
            Batal
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={!naturalSize}
            className="btn-primary flex-1 text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {naturalSize ? (
              <>
                <Check size={14} />
                Terapkan
              </>
            ) : (
              <>
                <Loader2 size={14} className="animate-spin" />
                Memuat...
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
