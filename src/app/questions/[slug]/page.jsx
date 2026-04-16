import ClientQuestion from "./ClientQuestion";

// 🔥 Fetch function (FIXED + STABLE)
async function getQuestion(slug) {
  try {
    const res = await fetch(
      `https://f-backend-vdi1.onrender.com/api/admin/questions/slug/${slug}`,
      {
        next: { revalidate: 10 }, // 🔥 important (cache + stability)
      }
    );

    // ❌ remove res.ok check (Render issue)
    const text = await res.text();

    try {
      const data = JSON.parse(text);
      return data.success ? data.data : null;
    } catch (err) {
      console.log("❌ JSON error:", text);
      return null;
    }

  } catch (err) {
    console.log("❌ Fetch error:", err);
    return null;
  }
}

// 🔥 Metadata (SEO)
export async function generateMetadata({ params }) {
  const question = await getQuestion(params.slug);

  if (!question) {
    return {
      title: "Question Not Found",
      robots: {
        index: false, // ❌ Google ko bol do index na kare
      },
    };
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

// 🔥 Page (SSR)
export default async function Page({ params }) {
  const question = await getQuestion(params.slug);

  if (!question) {
    return (
      <div className="text-center mt-10">
        ❌ سوال نہیں ملا <br />
        <small>{params.slug}</small>
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