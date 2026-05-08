import { notFound } from "next/navigation";

// Fetch single question
async function fetchQuestion(slug) {
  const res = await fetch(
    `https://api.maslakedeoband.in/api/questions/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  const data = await res.json();
  return data.success ? data.data : null;
}

// Metadata
export async function generateMetadata({ params }) {
  const q = await fetchQuestion(params.slug);
  if (!q) return {};

  return {
    title: q.metaTitle || q.question,
    description: q.metaDescription || q.answer?.slice(0, 160),
    alternates: {
      canonical: `https://maslakedeoband.in/questions/${params.slug}`,
    },
  };
}

// SSR Page
export default async function Page({ params }) {
  const q = await fetchQuestion(params.slug);
  if (!q) notFound();

  return (
    <article className="max-w-3xl mx-auto p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">{q.question}</h1>

      <section className="mb-6 leading-8">
        {q.answer}
      </section>

      {/* Google Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "QAPage",
            mainEntity: {
              "@type": "Question",
              name: q.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: q.answer,
              },
            },
          }),
        }}
      />
    </article>
  );
}
