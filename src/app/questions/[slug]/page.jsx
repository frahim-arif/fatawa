export const dynamic = "force-dynamic";

import ClientQuestion from "./ClientQuestion";

// Fetch
async function getQuestion(slug) {
  try {
    const res = await fetch(
      `https://f-backend-vdi1.onrender.com/api/admin/questions/slug/${slug}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

// Metadata
export async function generateMetadata({ params }) {
  const question = await getQuestion(params.slug);

  if (!question) {
    return { title: "Question Not Found" };
  }

  return {
    title: `${question.metaTitle || question.question} | اسلامی فتاویٰ`,
    description:
      question.metaDescription ||
      question.answer?.slice(0, 150),
  };
}
async function getQuestion(slug) {
  try {
    const res = await fetch(
      `https://f-backend-vdi1.onrender.com/api/admin/questions/slug/${slug}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res) return null;

    const data = await res.json();

    return data?.success ? data.data : null;
  } catch (err) {
    console.log("❌ SSR fetch error:", err);
    return null;
  }
}

// Page
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

  return <ClientQuestion question={question} slug={params.slug} />;
}