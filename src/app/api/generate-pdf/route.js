import { createElement } from "react";
import { RESUME_WIDTH } from "@/lib/cv-templates";
import { allTemplateMap } from "@/lib/all-templates";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request) {
  let browser;
  try {
    const body = await request.json();
    const data = body?.data;

    if (!data) {
      return Response.json(
        { error: "Data CV tidak ditemukan" },
        { status: 400 }
      );
    }

    const TemplateComponent =
      allTemplateMap[data.selectedTemplate] || allTemplateMap.minimal;
    if (!TemplateComponent) {
      return Response.json(
        { error: "Template tidak ditemukan" },
        { status: 400 }
      );
    }

    // Dynamic import react-dom/server.node
    const { renderToStaticMarkup } = await import("react-dom/server.node");
    const markup = renderToStaticMarkup(
      createElement(TemplateComponent, { data })
    );

    const html = `<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      html, body {
        width: ${RESUME_WIDTH}px;
      }
      @media print {
        div, section, article {
          break-inside: avoid-page;
        }
      }
    </style>
  </head>
  <body>${markup}</body>
</html>`;

    // === DUAL-MODE BROWSER LAUNCH ===
    // Deteksi produksi (Vercel) vs development (Lokal)
    const isProduction = process.env.NODE_ENV === "production";

    if (isProduction) {
      // PRODUKSI (Vercel): Pakai @sparticuz/chromium
      const chromium = (await import("@sparticuz/chromium")).default;
      const puppeteerCore = (await import("puppeteer-core")).default;

      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    } else {
      // DEVELOPMENT LOKAL (Windows Anda): Pakai puppeteer (full)
      const puppeteer = (await import("puppeteer")).default;

      browser = await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
        ],
      });
    }

    const page = await browser.newPage();
    await page.setViewport({ width: RESUME_WIDTH, height: 1123 });

    await page.setContent(html, {
      waitUntil: "networkidle0",
      timeout: 30000
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=cv.pdf",
      },
    });
  } catch (err) {
    console.error("=== PDF GENERATION ERROR ===");
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);
    console.error("============================");

    return Response.json(
      {
        error: "Gagal generate PDF di server. Coba lagi.",
        detail: err?.message || "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        console.error("Error closing browser:", e);
      }
    }
  }
}
