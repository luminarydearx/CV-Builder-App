"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Eye,
  Download,
  Zap,
  Star,
  Users,
  FileCheck,
} from "lucide-react";

const StatCard = ({ value, label, delay }) => (
  <div
    className="text-center animate-fade-up fade-up-init"
    style={{ animationDelay: delay, animationFillMode: "forwards" }}
  >
    <div className="font-display text-3xl font-bold gold-text mb-1">
      {value}
    </div>
    <div className="text-sm text-white/40 font-medium">{label}</div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <div
    className="glass-card rounded-2xl p-6 animate-fade-up fade-up-init"
    style={{ animationDelay: delay, animationFillMode: "forwards" }}
  >
    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-400/5 border border-gold-400/20 flex items-center justify-center mb-4">
      <Icon size={20} className="text-gold-400" />
    </div>
    <h3 className="font-semibold text-white/90 mb-2 text-base">{title}</h3>
    <p className="text-sm text-white/45 leading-relaxed">{desc}</p>
  </div>
);

const features = [
  {
    icon: Zap,
    title: "Setup dalam 5 Menit",
    desc: "Isi form sederhana dan CV profesional kamu langsung terbentuk secara otomatis.",
  },
  {
    icon: Eye,
    title: "Live Preview Real-time",
    desc: "Lihat perubahan CV-mu secara langsung setiap kali kamu mengetik.",
  },
  {
    icon: Sparkles,
    title: "Puluhan Template Premium",
    desc: "Pilih dari berbagai template CV yang dirancang oleh desainer profesional, dari yang minimalis sampai yang penuh warna.",
  },
  {
    icon: Download,
    title: "Download PDF",
    desc: "Export CV-mu sebagai file PDF berkualitas tinggi, siap kirim ke perekrut.",
  },
  {
    icon: FileCheck,
    title: "Tanpa Coding",
    desc: "Tidak perlu tahu HTML, CSS, atau JavaScript. Semua sudah diurus oleh PortoInstant.",
  },
  {
    icon: Star,
    title: "Gratis Selamanya",
    desc: "Semua fitur tersedia gratis. Tidak ada paywall, tidak ada biaya tersembunyi.",
  },
];

const steps = [
  {
    num: "01",
    title: "Isi Profil",
    desc: "Masukkan nama, bio, skill, dan informasi kontak kamu",
  },
  {
    num: "02",
    title: "Pilih Template",
    desc: "Pilih tampilan yang paling sesuai dengan personalitas kamu",
  },
  {
    num: "03",
    title: "Preview & Download",
    desc: "Lihat hasil akhir dan download sebagai PDF siap pakai",
  },
];

const HomePage = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll(".fade-up-init");
    if (els) {
      els.forEach((el) => {
        el.style.opacity = "0";
      });
    }
  }, []);

  return (
    <div ref={heroRef} className="pt-16">
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(16,52,166,0.15) 0%, transparent 70%)",
            }}
          />
          <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-gold-400/60 animate-pulse-slow" />
          <div className="absolute bottom-40 left-16 w-1.5 h-1.5 rounded-full bg-gold-300/40 animate-pulse-slow animate-delay-300" />
          <div className="absolute top-1/2 right-10 w-1 h-1 rounded-full bg-white/30 animate-pulse-slow animate-delay-500" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 tag-chip mb-8 animate-fade-up fade-up-init"
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              <Sparkles size={12} />
              <span>CV Generator #1 untuk Fresh Graduate</span>
            </div>

            <h1
              className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-6 animate-fade-up fade-up-init"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Buat CV <span className="gold-shimmer">Profesional</span>
              <br />
              dalam Hitungan Menit
            </h1>

            <p
              className="text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-up fade-up-init"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              Tidak perlu desain manual. Tidak perlu bingung format CV yang
              rapi dan ATS-friendly. Cukup isi form, pilih template, dan CV
              profesionalmu siap dalam 5 menit.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up fade-up-init"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              <Link href="/builder">
                <button className="btn-primary flex items-center gap-2 text-base px-8 py-3.5">
                  Mulai Sekarang — Gratis
                  <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/templates">
                <button className="btn-ghost flex items-center gap-2 text-base px-8 py-3.5">
                  <Eye size={16} />
                  Lihat Template
                </button>
              </Link>
            </div>

            <div
              className="mt-20 grid grid-cols-3 gap-8 max-w-sm mx-auto animate-fade-up fade-up-init"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              <StatCard value="3+" label="Template" delay="0.5s" />
              <StatCard value="5 Min" label="Setup Time" delay="0.6s" />
              <StatCard value="Free" label="Selamanya" delay="0.7s" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="divider-gold mb-24" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Semua yang Kamu Butuhkan</h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">
              Fitur lengkap untuk membuat CV yang memukau perekrut
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={`${0.1 + i * 0.08}s`} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Cara Kerja</h2>
            <p className="text-white/45 text-lg">
              Tiga langkah mudah, CV siap
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="glass-card rounded-2xl p-8 text-center relative"
              >
                <div className="font-mono text-5xl font-bold text-gold-400/20 mb-4 leading-none">
                  {step.num}
                </div>
                <h3 className="font-semibold text-white/90 text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="glass-strong rounded-3xl p-12 border border-gold-400/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent pointer-events-none" />
            <div className="relative">
              <h2 className="section-title mb-4">Siap Buat CV-mu?</h2>
              <p className="text-white/50 text-lg mb-8 max-w-md mx-auto">
                Bergabung dengan ribuan fresh graduate yang sudah membuat
                CV profesional mereka
              </p>
              <Link href="/builder">
                <button className="btn-primary flex items-center gap-2 mx-auto text-base px-10 py-4">
                  Mulai Gratis Sekarang
                  <ArrowRight size={18} />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="divider-gold mt-24" />
      </section>

      <footer className="py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-gold-400" />
              <span className="font-display text-sm font-medium text-white/40">
                PortoInstant
              </span>
            </div>
            <p className="text-xs text-white/25">
              Dibuat dengan ❤️ untuk para fresh graduate Indonesia
            </p>
            <p className="text-xs text-white/25">© {new Date().getFullYear()} PortoInstant - Created By Dearly Febriano Irwansyah</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
