import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server.node";
import puppeteer from "puppeteer";
import { RESUME_WIDTH } from "@/lib/cv-templates";
import { allTemplateMap } from "@/lib/all-templates";

/*
 * KENAPA BUG "PREVIEW TIDAK SINKRON DENGAN PDF" TERJADI DI VERSI LAMA:
 *
 * Versi React/Vite lama memakai html2canvas untuk "memotret" elemen DOM
 * preview jadi gambar, lalu menempelkan gambar itu ke PDF lewat jsPDF.
 * Masalahnya, html2canvas TIDAK memakai mesin rendering browser yang
 * sesungguhnya -- ia menulis ulang (reimplement) sebagian algoritma CSS
 * (terutama flexbox centering, line-height, dan font metrics) dengan caranya
 * sendiri di JavaScript. Hasilnya sering sedikit meleset dari yang
 * sebenarnya dirender browser, terutama pada elemen seperti badge biru
 * `<span style={{background:"#2b6cb0", padding:"2px 8px"}}>{exp.period}</span>`
 * di dalam flex row `justifyContent:"space-between"` -- inilah persis "kotak
 * biru dengan teks bergeser" yang dilaporkan.
 *
 * PERBAIKANNYA: route ini me-render komponen template CV yang SAMA PERSIS
 * (dari src/lib/cv-templates.jsx, modul yang sama yang dipakai LivePreview
 * di client) menjadi HTML statis lewat ReactDOMServer, lalu membuka HTML itu
 * di Chromium sungguhan (lewat Puppeteer) dan mencetaknya ke PDF lewat
 * page.pdf(). Karena PREVIEW dan PDF kini dirender oleh mesin browser yang
 * sama dengan komponen yang sama, hasilnya dijamin identik -- tidak ada lagi
 * reimplementasi CSS yang bisa meleset.
 */

export async function POST(request) {
  let browser;
  try {
    const body = await request.json();
    const data = body?.data;

    if (!data) {
      return Response.json({ error: "Data CV tidak ditemukan" }, { status: 400 });
    }

    const TemplateComponent = allTemplateMap[data.selectedTemplate] || allTemplateMap.minimal;
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
      // --no-sandbox diperlukan di beberapa environment (WSL, Docker, CI)
      // yang tidak menyediakan sandbox namespace yang Chromium butuhkan.
      // Aman untuk dipakai di sini karena hanya merender HTML yang kita
      // buat sendiri dari data lokal, bukan halaman web sembarangan.
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: RESUME_WIDTH, height: 1123 });
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await browser.close();

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=cv.pdf",
      },
    });
  } catch (err) {
    if (browser) {
      try {
        await browser.close();
      } catch {
        // ignore cleanup error
      }
    }
    console.error("Gagal generate PDF:", err);
    return Response.json(
      { error: "Gagal generate PDF di server. Coba lagi." },
      { status: 500 }
    );
  }
}
