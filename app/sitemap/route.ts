import db from "@@/database/db";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.BASE_DOMAIN;
  const staticPages = [
    { url: "/", lastModified: "2024-11-26", changeFreq: "daily", priority: 1.0 }
  ];

  const menus = db.prepare("SELECT url, updated_at FROM menus WHERE url IS NOT NULL").all();

  // Map data menu menjadi format sitemap
  const dynamicPages = menus.map((menu: { url: string; updated_at: string }) => ({
    url: menu.url,
    lastModified: new Date(menu.updated_at).toISOString(),
    changeFreq: "weekly",
    priority: 0.8,
  }));

  const allPages = [ ...staticPages, ...dynamicPages ]

  // Generate XML untuk setiap halaman
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages
        .map(
          (page) => `
        <url>
          <loc>${baseUrl}${page.url}</loc>
          <lastmod>${page.lastModified}</lastmod>
          <changefreq>${page.changeFreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `
        )
        .join("")}
    </urlset>
  `;

  return new NextResponse(sitemap.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
