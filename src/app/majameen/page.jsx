async function getMajameen() {
  const res = await fetch(
    "https://f-backend-vdi1.onrender.com/api/majameen",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function MajameenPage() {
  const data = await getMajameen();

  const majameen = data.data || [];

  return (
    <div className="min-h-screen bg-[#faf8ef] px-4 py-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-[#8a6a00] mb-8">
          📚 Majameen
        </h1>

        <div className="grid md:grid-cols-2 gap-5">

          {majameen.map((item) => (
            <a
              key={item._id}
              href={`/majameen/${item._id}`}
              className="bg-white border border-[#ead89c] rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-[#8a6a00] mb-2">
                {item.title}
              </h2>

              <p className="text-sm text-gray-500 mb-3">
                ✍️ {item.author || "Unknown"}
              </p>

              <p className="text-gray-700 line-clamp-3">
                {item.content}
              </p>
            </a>
          ))}

        </div>

      </div>
    </div>
  );
}