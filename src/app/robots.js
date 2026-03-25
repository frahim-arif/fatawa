// app/robots.ts (Next.js 13+ App Router)
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/private/', // agar koi private pages hai to
      },
    ],
    sitemap: 'https://maslakedeoband.in/sitemap.xml', // apni actual domain ka sitemap URL
  }
}
