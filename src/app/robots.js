// app/robots.ts (Next.js 13+ App Router)
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.maslakedeoband.in/sitemap.xml",
  };
}
