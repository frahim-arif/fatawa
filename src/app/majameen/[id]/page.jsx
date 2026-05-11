async function getMajmoon(id) {
  const res = await fetch(
    `https://f-backend-vdi1.onrender.com/api/majameen/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function SingleMajmoon({ params }) {

  const data = await getMajmoon(params.id);

  const item = data.item;

  if (!item) {
    return (
      <div className="p-10 text-center">
        Majmoon Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8ef] px-4 py-8">

      <div className="max-w-4xl mx-auto bg-white border border-[#ead89c] rounded-2xl p-6 shadow-sm">

        <h1 className="text-3xl font-bold text-[#8a6a00] mb-3">
          {item.title}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          ✍️ {item.author || "Unknown"}
        </p>

        <div className="text-[18px] leading-9 text-gray-800 whitespace-pre-line">
          {item.content}
        </div>

      </div>
    </div>
  );
}