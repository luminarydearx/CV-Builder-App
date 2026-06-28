"use client";

import { useRouter } from "next/navigation";
import { usePortfolio } from "@/context/PortfolioContext";
import { templates } from "@/lib/templates-meta";
import { DEMO_DATA } from "@/lib/demo-data";
import TemplateThumbnail from "@/components/preview/TemplateThumbnail";
import { Check, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

const TemplatesPage = () => {
  const { data, updateField } = usePortfolio();
  const router = useRouter();

  const handleSelect = (id) => {
    updateField("selectedTemplate", id);
    toast.success(
      `Template "${templates.find((t) => t.id === id).name}" dipilih!`,
    );
    router.push("/builder");
  };

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="tag-chip inline-flex mb-6">Pilih Tampilanmu</div>
          <h1 className="section-title mb-4">Template Premium</h1>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Setiap template bisa kamu sesuaikan warnanya sendiri di Builder
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {templates.map((tmpl) => (
            <div
              key={tmpl.id}
              className={`glass-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${
                data.selectedTemplate === tmpl.id
                  ? "border-gold-400/40 shadow-gold ring-1 ring-gold-400/30"
                  : "hover:border-white/20 hover:translate-y-[-2px]"
              }`}
            >
              <div className="relative bg-gradient-to-b from-white/[0.02] to-transparent">
                <TemplateThumbnail templateId={tmpl.id} data={DEMO_DATA} />
                {data.selectedTemplate === tmpl.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gold-400 flex items-center justify-center shadow-gold z-10">
                    <Check size={11} className="text-navy-950 font-bold" />
                  </div>
                )}
                {tmpl.hasPhoto && (
                  <div className="absolute bottom-2 left-2 z-10">
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium">
                      📷 Foto
                    </span>
                  </div>
                )}
              </div>

              <div className="p-3.5 flex flex-col flex-1 border-t border-white/[0.05]">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-display text-sm font-semibold text-white/90 leading-tight">
                    {tmpl.name}
                  </h3>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full bg-gradient-to-r ${tmpl.accent} text-white font-medium whitespace-nowrap flex-shrink-0`}
                  >
                    {tmpl.tag}
                  </span>
                </div>
                <p className="text-white/30 text-[11px] leading-relaxed mb-3 flex-1 line-clamp-2">
                  {tmpl.desc}
                </p>

                <button
                  onClick={() => handleSelect(tmpl.id)}
                  className={`w-full text-xs py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-1.5 ${
                    data.selectedTemplate === tmpl.id
                      ? "btn-primary"
                      : "btn-ghost"
                  }`}
                >
                  {data.selectedTemplate === tmpl.id ? (
                    <>
                      <Check size={11} />
                      Aktif
                    </>
                  ) : (
                    <>
                      Pilih
                      <ArrowRight size={11} />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
