// app/sitemap.ts
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.maslakedeoband.in";

  // 🔹 Static pages
  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  // 🔹 Fetch dynamic questions
  let questions: any[] = [];

  try {
    const res = await fetch(
      "https://f-backend-vdi1.onrender.com/api/admin/questions?limit=200",
      { next: { revalidate: 3600 } } // cache for 1 hour
    );

    const data = await res.json();

    if (data?.success && Array.isArray(data.data)) {
      questions = data.data;
    }
  } catch (error) {
    console.error("Sitemap fetch error:", error);
  }

  // 🔹 Remove duplicates + invalid slugs
  const uniqueQuestions = Array.from(
    new Map(
      questions
        .filter((q) => q?.slug && typeof q.slug === "string")
        .map((q) => [q.slug, q])
    ).values()
  );

  // 🔹 Map to sitemap format
  const questionPages: MetadataRoute.Sitemap = uniqueQuestions.map((q) => ({
    url: `${baseUrl}/questions/${q.slug}`,
    lastModified: q.createdAt ? new Date(q.createdAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // 🔹 Limit for SEO (important)
  const limitedQuestions = questionPages.slice(0, 150);

  return [...staticPages, ...limitedQuestions];
}