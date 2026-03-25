export async function GET() {
  const baseUrl = "https://maslakedeoband.com"; // 👈 apni live domain

  // Static pages
  const routes = [
    "",           // Home
    "about",      // About page
    "contact",    // Contact page
    "privacy",    // Privacy policy
    "disclaimer", // Disclaimer page
  ];

  // Example fatawa articles (replace with dynamic fetch if needed)
  const fatawaArticles = [
    "fatawa/article-1",
    "fatawa/article-2",
    "fatawa/article-3",
  ];

  const allRoutes = [...routes, ...fatawaArticles];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map((route) => {
      return `
  <url>
    <loc>${baseUrl}/${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route === "" ? "daily" : "weekly"}</changefreq>
    <priority>${route === "" ? "1.0" : "0.8"}</priority>
  </url>
  `;
    })
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
