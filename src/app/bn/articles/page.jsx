"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function BanglaArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const backend = "https://f-backend-vdi1.onrender.com/api";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `${backend}/majameen`
        );

        const data = await res.json();

        if (data.success) {
          setArticles(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const getTitle = (item) => {
    return (
      item.banglaTitle ||
      item.bnTitle ||
      item.titleBn ||
      item.title
    );
  };

  const filteredArticles = articles.filter((item) =>
    getTitle(item)
      ?.toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#f7f3e8]">

      <section className="bg-[#3b2f2f] py-10 px-4 text-center">

        <h1 className="text-3xl md:text-4xl font-bold text-yellow-300">
          ইসলামী প্রবন্ধ
        </h1>

        <p className="text-yellow-100 mt-2">
          নির্বাচিত ইসলামী প্রবন্ধসমূহ
        </p>

      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">

        <div className="flex items-center bg-white border border-yellow-500 rounded-xl mb-6">

          <Search className="ml-3 text-yellow-600" />

          <input
            type="text"
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="প্রবন্ধ খুঁজুন..."
            className="w-full p-3 outline-none"
          />

        </div>

        {loading ? (

          <p className="text-center">
            লোড হচ্ছে...
          </p>

        ) : (

          <div className="grid md:grid-cols-2 gap-4">

            {filteredArticles.map((item) => (

              <Link
                key={item._id}
                href={`/bn/articles/${
                  item.slug || item._id
                }`}
                className="
                  bg-white
                  rounded-xl
                  border border-yellow-200
                  p-5
                  shadow-sm
                  hover:shadow-lg
                  hover:border-yellow-500
                  transition
                "
              >
                <h2 className="text-xl font-bold text-[#3b2f2f]">

                  {getTitle(item)}

                </h2>

              </Link>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}