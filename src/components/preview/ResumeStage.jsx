"use client";

import { useEffect, useRef, useState } from "react";
import { RESUME_WIDTH } from "@/lib/cv-templates";

/**
 * Kenapa komponen ini ada:
 * Versi React/Vite lama merender CV langsung dengan `width: "100%"` lalu
 * meng-clip kontennya ke `height: 1123px; overflow: hidden`. Akibatnya:
 *   1. Lebar resume ikut melar/menyempit sesuai lebar container saat itu,
 *      padahal PDF selalu dicetak di lebar A4 yang FIXED -- jadi proporsi
 *      preview vs PDF bisa beda tergantung lebar jendela browser.
 *   2. Konten yang lebih panjang dari satu halaman A4 langsung KEPOTONG di
 *      preview (overflow:hidden), padahal sebenarnya tidak hilang, cuma
 *      tersembunyi.
 *
 * ResumeStage merender children di lebar intrinsik tetap (794px, setara A4
 * @ 96dpi -- sama dengan lebar yang dipakai saat generate PDF di server),
 * lalu men-scale seluruh kanvas itu dengan CSS transform agar pas di
 * container manapun. Hasilnya: apa pun ukuran jendela browser, proporsi
 * yang terlihat di preview SELALU sama dengan proporsi di PDF, dan konten
 * panjang tidak pernah terpotong -- cuma tampil lebih kecil.
 */
export default function ResumeStage({ children, className = "" }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [naturalHeight, setNaturalHeight] = useState(1123);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      if (w > 0) setScale(w / RESUME_WIDTH);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => setNaturalHeight(el.scrollHeight || 1123);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  return (
    <div ref={outerRef} className={className} style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          height: naturalHeight * scale,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          ref={innerRef}
          style={{
            width: RESUME_WIDTH,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
