import { supabase } from "@/app/lib/supabaseClient";

export async function GET() {
  const { data } = await supabase
    .from("documents")
    .select("dok_id, datum")
    .order("datum", { ascending: false })
    .limit(500);

  const urls = data!
    .map(
      (doc) => `
      <url>
        <loc>https://folkomrostningar.se/dokument/${doc.dok_id}</loc>
        <lastmod>${doc.datum}</lastmod>
      </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
