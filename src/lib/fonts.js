import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";

// Self-hosted via next/font (no external <link> request, no FOUT/layout
// shift from a late-loading CDN stylesheet). Same three families, same
// weights, as the original index.html <link> tag.

export const displayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
