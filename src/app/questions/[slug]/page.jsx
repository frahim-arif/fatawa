import ClientQuestion from "./ClientQuestion";

// 🔥 Fetch function
async function getQuestion(slug) {
  try {
    const res = await fetch(
      `https://f-backend-vdi1.onrender.com/api/admin/questions/slug/${slug}`,
      {
        cache: "no-store",
        next: { revalidate: 10 }, // 🔥 important (stability)
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

// 🔥 Metadata
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

    alternates: {
      canonical: `https://www.maslakedeoband.in/questions/${params.slug}`,
    },
  };
}

// 🔥 Page
export default async function Page({ params }) {
  const question = await getQuestion(params.slug);

  // ❌ REMOVE notFound()

  if (!question) {
    return (
      <div className="text-center mt-10">
        ⏳ لوڈ ہو رہا ہے یا سوال نہیں ملا...
      </div>
    );
  }

  return (
    <ClientQuestion
      question={question}
      slug={params.slug}
    />
  );
}