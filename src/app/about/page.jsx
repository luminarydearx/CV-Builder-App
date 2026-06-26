import Link from "next/link";
import { Zap, Heart, Code2, Target, ArrowRight, Github } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400/20 to-gold-400/5 border border-gold-400/20 flex items-center justify-center mx-auto mb-6 shadow-gold animate-float">
            <Zap size={28} className="text-gold-400" fill="currentColor" />
          </div>
          <h1 className="section-title mb-4">Tentang PortoInstant</h1>
          <p className="text-white/45 text-lg leading-relaxed">
            Platform gratis untuk membantu fresh graduate Indonesia membuat
            CV profesional tanpa coding.
          </p>
        </div>

        <div className="divider-gold mb-12" />

        <div className="space-y-8">
          <div className="glass-card rounded-2xl p-7">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center flex-shrink-0">
                <Target size={18} className="text-gold-400" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-white/90 mb-2">
                  Mengapa PortoInstant?
                </h2>
                <p className="text-white/50 leading-relaxed text-sm">
                  Banyak fresh graduate berbakat yang kehilangan peluang kerja bukan karena kurang skill,
                  tapi karena tidak punya CV yang menarik dan rapi. Membuat CV dari nol membutuhkan
                  waktu, skill desain, dan pengetahuan coding yang tidak semua orang punya.
                  PortoInstant hadir untuk menjembatani gap ini.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-7">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center flex-shrink-0">
                <Code2 size={18} className="text-gold-400" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-white/90 mb-2">
                  Teknologi yang Digunakan
                </h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Next.js 16", "React 19", "Tailwind CSS", "Motion", "Puppeteer", "Lucide Icons"].map((tech) => (
                    <span key={tech} className="tag-chip">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-7">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center flex-shrink-0">
                <Heart size={18} className="text-gold-400" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-white/90 mb-2">
                  Gratis Selamanya
                </h2>
                <p className="text-white/50 leading-relaxed text-sm">
                  PortoInstant sepenuhnya gratis dan akan tetap gratis. Tidak ada biaya tersembunyi,
                  tidak ada fitur premium, tidak ada iklan. Semua fitur tersedia untuk semua orang,
                  karena kami percaya setiap orang berhak mendapatkan kesempatan yang sama.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="divider-gold my-12" />

        <div className="text-center">
          <p className="text-white/30 text-sm mb-8">
            Punya saran atau menemukan bug? Kami senang mendengarnya.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/builder">
              <button className="btn-primary flex items-center gap-2 px-8 py-3">
                Mulai Buat CV
                <ArrowRight size={16} />
              </button>
            </Link>
            <a href="https://github.com/dearlyfebrianos" target="_blank" rel="noopener noreferrer">
              <button className="btn-ghost flex items-center gap-2 px-8 py-3">
                <Github size={16} />
                GitHub
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
