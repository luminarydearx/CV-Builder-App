import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <div
          className="font-mono text-[120px] font-bold leading-none mb-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(232,201,106,0.15) 0%, rgba(232,201,106,0.05) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </div>
        <h1 className="font-display text-2xl font-semibold text-white/70 mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-white/35 text-sm mb-8 max-w-sm mx-auto">
          Halaman yang kamu cari tidak ada atau telah dipindahkan.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/">
            <button className="btn-primary flex items-center gap-2">
              <ArrowLeft size={15} />
              Kembali ke Home
            </button>
          </Link>
          <Link href="/builder">
            <button className="btn-ghost flex items-center gap-2">
              <Zap size={15} />
              Buat CV
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
