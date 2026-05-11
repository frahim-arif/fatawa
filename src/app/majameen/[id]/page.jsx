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
      <div className="min-h-screen flex items-center justify-center bg-[#fdfaf3]">
        <div className="bg-white border border-[#ead89c] px-6 py-4 rounded-xl shadow-sm text-[#8a6a00]">
          Majmoon Not Found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfaf3] px-4 py-8">

      <div className="max-w-4xl mx-auto bg-white border border-[#f0dfb2] rounded-3xl p-6 shadow-sm">

        {/* Title */}
        <h1
          className="text-4xl text-center text-[#8b6b1b] mb-3"
          style={{
            fontFamily:
              "'Jameel Noori Nastaleeq', serif",
          }}
        >
          {item.title}
        </h1>

        {/* Author */}
        <p className="text-center text-sm text-gray-500 mb-8">
          ✍️ {item.author || "Admin"}
        </p>

        {/* Content */}
        <div
          className="text-[22px] leading-[3rem] text-gray-800 whitespace-pre-line text-right"
          style={{
            fontFamily:
              "'Jameel Noori Nastaleeq', serif",
          }}
        >
          {item.content}
        </div>

      </div>

    </div>
  );
}