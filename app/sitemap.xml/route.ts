import { supabase } from "@/app/lib/supabaseClient";

export const revalidate = 3600; // regenerate sitemap every hour

export async function GET() {
  const baseUrl = "https://folkomrostningar.se";

  // Static pages
  const staticUrls = [
    { loc: baseUrl, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/about`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/privacy`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/terms`, lastmod: new Date().toISOString() },
  ];

  // Fetch latest documents from Supabase
  const { data, error } = await supabase
    .from("documents")
    .select("dok_id, datum")
    .order("datum", { ascending: false })
    .limit(500); // adjust if you want more/less URLs

  const documentUrls =
    data?.map((doc) => {
      const isoDate = doc.datum
        ? new Date(doc.datum).toISOString()
        : new Date().toISOString();

      return {
        loc: `${baseUrl}/dokument/${doc.dok_id}`,
        lastmod: isoDate,
      };
    }) ?? [];

  const allUrls = [...staticUrls, ...documentUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls
      .map(
        (u) => `
      <url>
        <loc>${u.loc}</loc>
        <lastmod>${u.lastmod}</lastmod>
      </url>`
      )
      .join("")}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
