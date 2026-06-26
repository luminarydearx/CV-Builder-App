import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server.node";
import puppeteer from "puppeteer";
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
      return Response.json({ error: "Data CV tidak ditemukan" }, { status: 400 });
    }

    const TemplateComponent = allTemplateMap[data.selectedTemplate] || allTemplateMap.minimal;

    if (!TemplateComponent) {
      return Response.json(
        { error: `Template "${data.selectedTemplate}" tidak ditemukan` },
        { status: 400 }
      );
    }

    const markup = renderToStaticMarkup(createElement(TemplateComponent, { data }));

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

    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage", // Mencegah crash pada container/environment terbatas
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: RESUME_WIDTH, height: 1123 });

    // Tambahkan timeout explisit agar tidak hang tanpa pesan error
    await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });

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
    console.error("Gagal generate PDF:", err);
    const isDev = process.env.NODE_ENV !== "production";

    // Kirim detail error ke frontend (hanya saat dev) agar mudah di-debug
    return Response.json(
      {
        error: "Gagal generate PDF di server. Coba lagi.",
        detail: isDev ? err?.message : undefined,
        stack: isDev ? err?.stack : undefined,
      },
      { status: 500 }
    );
  } finally {
    // Gunakan finally agar browser PASTI ditutup meskipun terjadi error di tengah jalan
    if (browser) {
      try {
        await browser.close();
      } catch {
        // ignore cleanup error
      }
    }
  }
}
