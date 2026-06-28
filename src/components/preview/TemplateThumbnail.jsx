"use client";

import { useEffect, useRef, useState } from "react";
import { allTemplateMap } from "@/lib/all-templates";
import { RESUME_WIDTH, RESUME_MIN_HEIGHT } from "@/lib/cv-templates";

/**
 * Dipakai di halaman Templates untuk menampilkan CONTOH PENGGUNAAN nyata
 * tiap template (data contoh terisi), bukan skeleton/placeholder abu-abu --
 * supaya user benar-benar lihat seperti apa template itu jadinya, mirip
 * thumbnail di Canva. Karena ini me-render KOMPONEN TEMPLATE YANG SAMA
 * dipakai preview & PDF, thumbnail ini otomatis selalu akurat -- tidak
 * akan pernah berbeda dari hasil asli.
 */
export default function TemplateThumbnail({ templateId, data, fixedHeightRatio = 1123 / 794 }) {
  const Component = allTemplateMap[templateId];
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const el = containerRef.current;
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

  if (!Component) return null;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        aspectRatio: `1 / ${fixedHeightRatio}`,
        overflow: "hidden",
        position: "relative",
        background: "#fff",
      }}
    >
      <div
        style={{
          width: RESUME_WIDTH,
          minHeight: RESUME_MIN_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Component data={data} />
      </div>
    </div>
  );
}
