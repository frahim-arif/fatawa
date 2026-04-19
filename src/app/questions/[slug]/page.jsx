"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";

export default function SingleQuestion() {
  const { slug } = useParams();

  const backend = "https://f-backend-vdi1.onrender.com/api/admin/questions";

  const [question, setQuestion] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchQuestion = async () => {
      try {
        const res = await fetch(`${backend}/slug/${slug}`);
        const data = await res.json();

        if (data.success) {
          setQuestion(data.data);
        } else {
          setQuestion(null);
        }
      } catch (err) {
        console.error("❌ Error fetching question:", err);
        setQuestion(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelated = async () => {
      try {
        const res = await fetch(`${backend}?limit=10`);
        const data = await res.json();

        if (data.success) {
          setRelated(data.data);
        }
      } catch (err) {
        console.error("❌ Error fetching related:", err);
      }
    };

    fetchQuestion();
    fetchRelated();
  }, [slug]);

  // ✅ AUTO LINK
  const autoLink = (text, related) => {
    try {
      if (!text || !Array.isArray(related)) return text;

      let updatedText = text;
      let linkCount = 0;
      const MAX_LINKS = 3;

      const escapeRegExp = (string) =>
        string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      related.forEach((item) => {
        if (linkCount >= MAX_LINKS) return;
        if (!item?.keywords?.length || !item?.slug) return;
        if (item.slug === slug) return;

        item.keywords.forEach((word) => {
          if (linkCount >= MAX_LINKS) return;
          if (!word) return;

          const safeKeyword = escapeRegExp(word);
          const regex = new RegExp(`(${safeKeyword})`, "i");

          if (regex.test(updatedText)) {
            updatedText = updatedText.replace(
              regex,
              `<a href="/questions/${item.slug}" class="text-blue-600 underline">$1</a>`
            );
            linkCount++;
          }
        });
      });

      return updatedText;
    } catch (err) {
      console.error("❌ autoLink error:", err);
      return text;
    }
  };
  if (loading)
    return <h1 className="text-center mt-10">⏳ لوڈ ہو رہا ہے...</h1>;

  if (!question)
    return <h1 className="text-center mt-10">❌ سوال نہیں ملا</h1>;

  const title = question.metaTitle || `${question.question} | Maslak e Deoband`;
  const description =
    question.metaDescription ||
    question.answer?.slice(0, 150) ||
    "اسلامی سوال و جواب";

  const url = `https://www.maslakedeoband.in/questions/${slug}`;

  return (
    <>
      {/* 🔥 SEO IMPROVED */}
      <Head>
        <meta property="og:image" content="https://www.maslakedeoband.in/og-image.jpg" />
        <meta name="twitter:image" content="https://www.maslakedeoband.in/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "QAPage",
            "mainEntity": {
              "@type": "Question",
              "name": question.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": question.answer,
              },
            },
          })}
        </script>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta
          name="keywords"
          content={
            Array.isArray(question.keywords)
              ? question.keywords.join(", ")
              : question.keywords || "Islamic fatwa, سوال جواب"
          }
        />
        {/* Canonical */}
        <link rel="canonical" href={url} />

        {/* Open Graph (Facebook, WhatsApp) */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-6 text-right">
        <nav className="text-sm text-gray-500 mb-2">
          <a href="/">Home</a> /{" "}
          <a href={`/category/${question.category}`}>{question.category}</a> /{" "}
          <span>{question.question}</span>
        </nav>
        {/* Question */}
        <div className="p-5 rounded-2xl border bg-yellow-50">
          <h1 className="text-lg md:text-2xl font-bold text-green-800 leading-8">
            {question.metaTitle || question.question}
          </h1>
        </div>

        {/* Answer */}
        <div className="p-5 md:p-6 rounded-2xl border bg-white shadow-sm leading-9">
          <p
            className="text-black text-[18px] md:text-[20px]"
            dangerouslySetInnerHTML={{
              __html: autoLink(question.answer, related),
            }}
          />
        </div>
        

        {/* Hawala */}
        <div className="p-5 rounded-2xl border bg-black space-y-4">
          {question.hawala1 && <p>{question.hawala1}</p>}
          {question.hawala2 && <p>{question.hawala2}</p>}
          {question.hawala3 && <p>{question.hawala3}</p>}
        </div>

        {/* ✅ RELATED QUESTIONS YAHAN ADD KARO */}
        {related.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-bold mb-2">مزید متعلقہ سوالات</h3>
            <ul className="space-y-2">
              {related.slice(0, 5).map((item) => (
                <li key={item._id}>
                  <a
                    href={`/questions/${item.slug}`}
                    className="text-blue-600 underline"
                  >
                    {item.question}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}