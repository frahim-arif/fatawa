// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Head from "next/head";


// import { generateSEO } from "@/lib/questionSeo";


// export default function SingleQuestion() {
//   const { slug } = useParams();

  

//   const backend = "https://f-backend-vdi1.onrender.com/api/admin/questions";

//   const [question, setQuestion] = useState(null);
//   const [related, setRelated] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!slug) return;

//     const fetchQuestion = async () => {
//       try {
//         const res = await fetch(`${backend}/slug/${slug}`);
//         const data = await res.json();

//         if (data.success) {
//           setQuestion(data.data);
//         } else {
//           setQuestion(null);
//         }
//       } catch (err) {
//         console.error("❌ Error fetching question:", err);
//         setQuestion(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchRelated = async () => {
//       try {
//         const res = await fetch(`${backend}`);
//         const data = await res.json();

//         if (data.success) {
//           setRelated(data.data);
//         }
//       } catch (err) {
//         console.error("❌ Error fetching related:", err);
//       }
//     };

//     fetchQuestion();
//     fetchRelated();
//   }, [slug]);

//   // ✅ AUTO LINK FUNCTION (KEYWORDS BASED)
//   const autoLink = (text, related) => {
//     try {
//       if (!text || !Array.isArray(related)) return text;

//       let updatedText = text;
//       let linkCount = 0;
//       const MAX_LINKS = 5;

//       const escapeRegExp = (string) =>
//         string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

//       related.forEach((item) => {
//         if (linkCount >= MAX_LINKS) return;
//         if (!item?.keywords?.length || !item?.slug) return;
//         if (item.slug === slug) return;

//         item.keywords.forEach((word) => {
//           if (linkCount >= MAX_LINKS) return;
//           if (!word) return;

//           const safeKeyword = escapeRegExp(word);
//           const regex = new RegExp(`(${safeKeyword})`, "i");

//           if (regex.test(updatedText)) {
//             updatedText = updatedText.replace(
//               regex,
//               `<a href="/questions/${item.slug}" class="text-blue-600 dark:text-blue-400 font-semibold underline">$1</a>`
//             );
//             linkCount++;
//           }
//         });
//       });

//       return updatedText;
//     } catch (err) {
//       console.error("❌ autoLink error:", err);
//       return text;
//     }
//   };

//   if (loading)
//     return <h1 className="text-center mt-10">⏳ لوڈ ہو رہا ہے...</h1>;

//   if (!question)
//     return <h1 className="text-center mt-10">❌ سوال نہیں ملا</h1>;

//   return (
//     <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-6 text-right">

//       {/* SEO */}
//       <Head>
//         <title>
//           {question.metaTitle || question.question} | اسلامی فتاویٰ
//         </title>

//         <meta
//           name="description"
//           content={
//             question.metaDescription ||
//             question.answer?.slice(0, 150)
//           }
//         />

//         <meta
//           name="keywords"
//           content={
//             question.keywords?.join(", ") ||
//             "Islamic fatwa, سوال جواب, فتوی"
//           }
//         />
//       </Head>

//       {/* Question */}
//       <div className="p-5 rounded-2xl border border-yellow-200 dark:border-gray-700 bg-yellow-50 dark:bg-gray-800 shadow-sm">
//         <h1 className="text-lg md:text-2xl font-bold text-green-800 dark:text-green-400 leading-8">
//           {question.question}
//         </h1>
//       </div>

//       {/* Answer */}
//       <div className="p-5 md:p-6 rounded-2xl border border-gray-300 bg-white shadow-sm leading-9">        {question?.answer && (
//         <p
//           className="text-black text-[18px] md:text-[20px]"
//           dangerouslySetInnerHTML={{
//             __html: autoLink(question.answer, related),
//           }}
//         />
//       )}
//       </div>

//       {/* Hawala */}
// <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#121212] shadow-sm space-y-4">


//   <div className="space-y-3 text-[17px] md:text-[19px] leading-9 text-gray-900 dark:text-gray-200">

//     {question.hawala1 && (
//       <p className="px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#222] transition arabic">
//         {question.hawala1}
//       </p>
//     )}

//     {question.hawala2 && (
//       <p className="px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#222] transition arabic">
//         {question.hawala2}
//       </p>
//     )}

//     {question.hawala3 && (
//       <p className="px-4 py-3 rounded-lg bg-white dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#222] transition arabic">
//         {question.hawala3}
//       </p>
//     )}

//   </div>
// </div>
// </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

export default function ClientQuestion({ question, slug }) {
  const backend = "https://f-backend-vdi1.onrender.com/api/admin/questions";

  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(`${backend}`);
        const data = await res.json();

        if (data.success) {
          setRelated(data.data);
        }
      } catch (err) {
        console.error("❌ Error fetching related:", err);
      }
    };

    fetchRelated();
  }, []);

  // ✅ AUTO LINK (same)
  const autoLink = (text, related) => {
    try {
      if (!text || !Array.isArray(related)) return text;

      let updatedText = text;
      let linkCount = 0;
      const MAX_LINKS = 5;

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

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-6 text-right">

      {/* Question */}
      <div className="p-5 rounded-2xl border bg-yellow-50">
        <h1 className="text-lg md:text-2xl font-bold text-green-800 leading-8">
          {question.question}
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
      <div className="p-5 rounded-2xl border bg-gray-50 space-y-4">

        {question.hawala1 && <p>{question.hawala1}</p>}
        {question.hawala2 && <p>{question.hawala2}</p>}
        {question.hawala3 && <p>{question.hawala3}</p>}

      </div>
    </div>
  );
}