// app/sitemap.ts

export default async function sitemap() {
  const baseUrl = "https://www.maslakedeoband.in";

  // 🔹 Static pages
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  // 🔹 Dynamic questions (API se)
  let questions: any[] = [];

  try {
    const res = await fetch(
      "https://f-backend-vdi1.onrender.com/api/admin/questions?limit=1000"
    );
    const data = await res.json();

    if (data.success) {
      questions = data.data;
    }
  } catch (err) {
    console.error("Sitemap fetch error:", err);
  }

  const questionPages = questions.map((q) => ({
    url: `${baseUrl}/questions/${q.slug}`,
    lastModified: new Date(q.createdAt),
  }));

  return [...staticPages, ...questionPages];
}