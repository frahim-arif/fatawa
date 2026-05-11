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

  const { id } = await params;

  const data = await getMajmoon(id);

  const item = data.item;

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Majmoon Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfaf3] px-4 py-8">

      <div className="max-w-4xl mx-auto bg-white border border-[#f0dfb2] rounded-3xl p-6 shadow-sm">

        <h1
          className="text-4xl text-center text-[#8b6b1b] mb-3"
          style={{
            fontFamily:
              "'Jameel Noori Nastaleeq', serif",
          }}
        >
          {item.title}
        </h1>

        <p className="text-center text-sm text-gray-500 mb-8">
          ✍️ {item.author || "Admin"}
        </p>

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