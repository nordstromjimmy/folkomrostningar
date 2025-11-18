export function GET() {
  return new Response(
    `User-agent: *
Allow: /
Sitemap: https://folkomrostningar.se/sitemap.xml
`,
    { headers: { "Content-Type": "text/plain" } }
  );
}
