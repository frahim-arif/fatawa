export const dynamic = "force-dynamic";

import ClientQuestion from "./ClientQuestion";

// 🔥 Fetch ONCE (stable)
async function getQuestion(slug) {
  const url = `https://f-backend-vdi1.onrender.com/api/admin/questions/slug/${slug}`;

  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();

      if (data.success) return data.data;
    } catch (err) {
      console.log("Retry:", i);
    }

    await new Promise((r) => setTimeout(r, 700));
  }

  return null;
}

// 🔥 Metadata (light version)
export async function generateMetadata({ params }) {
  return {
    title: "اسلامی فتاویٰ",
  };
}

// 🔥 Page (MAIN SSR)
export default async function Page({ params }) {
  const question = await getQuestion(params.slug);

  if (!question) {
    return (
      <div className="text-center mt-10">
        ❌ سوال نہیں ملا
        <br />
        <small>{params.slug}</small>
      </div>
    );
  }

  return (
    <>
      {/* ✅ SEO here (server side) */}
      <head>
        <title>
          {question.metaTitle || question.question} | اسلامی فتاویٰ
        </title>

        <meta
          name="description"
          content={
            question.metaDescription ||
            question.answer?.slice(0, 150)
          }
        />
      </head>

      <ClientQuestion question={question} slug={params.slug} />
    </>
  );
}