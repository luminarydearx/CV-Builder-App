import { displayFont, bodyFont, monoFont } from "@/lib/fonts";
import { PortfolioProvider } from "@/context/PortfolioContext";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/PageTransition";
import ToastProvider from "@/components/ToastProvider";
import "./globals.css";

export const metadata = {
  title: "PortoInstant — CV Builder Profesional dalam Menit",
  description:
    "Buat CV profesional yang memukau dalam hitungan menit. Tanpa desain manual, tanpa pusing format.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body className="min-h-screen relative noise-overlay">
        <PortfolioProvider>
          <div className="min-h-screen relative noise-overlay">
            <div className="fixed inset-0 bg-radial-navy pointer-events-none z-0" />
            <div className="fixed inset-0 bg-radial-accent pointer-events-none z-0" />
            <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] bg-blue-900/20 pointer-events-none z-0" />
            <div className="fixed bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] bg-indigo-900/15 pointer-events-none z-0" />
            <div className="relative z-10">
              <Navbar />
              <PageTransition>{children}</PageTransition>
            </div>
          </div>
        </PortfolioProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
