import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.maslakedeoband.in";

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/books",
    "/majameen",
    "/40-hadith-free",
    "/masnoon-duayee",
    "/islami-naam",
    "/ozan-shariah-calculator",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  let questions: any[] = [];
  let majameen: any[] = [];

  try {
    const res = await fetch(
      "https://f-backend-vdi1.onrender.com/api/admin/questions?limit=500",
      { next: { revalidate: 3600 } }
    );

    const data = await res.json();

    if (data?.success && Array.isArray(data.data)) {
      questions = data.data;
    }
  } catch (error) {
    console.error("Questions sitemap fetch error:", error);
  }

  try {
    const res = await fetch(
      "https://f-backend-vdi1.onrender.com/api/majameen",
      { next: { revalidate: 3600 } }
    );

    const data = await res.json();

    if (data?.success && Array.isArray(data.data)) {
      majameen = data.data;
    }
  } catch (error) {
    console.error("Majameen sitemap fetch error:", error);
  }

  const uniqueQuestions = Array.from(
    new Map(
      questions
        .filter((q) => q?.slug && typeof q.slug === "string")
        .map((q) => [q.slug, q])
    ).values()
  );

  const questionPages: MetadataRoute.Sitemap = uniqueQuestions.map((q) => ({
    url: `${baseUrl}/questions/${q.slug}`,
    lastModified: q.createdAt ? new Date(q.createdAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const majameenPages: MetadataRoute.Sitemap = majameen
    .filter((m) => m?._id)
    .map((m) => ({
      url: `${baseUrl}/majameen/${m._id}`,
      lastModified: m.createdAt ? new Date(m.createdAt) : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticPages, ...questionPages, ...majameenPages];
}