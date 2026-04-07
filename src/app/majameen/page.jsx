import Link from "next/link";

async function getMajameen() {
  try {
    const res = await fetch('https://f-backend-vdi1.onrender.com/api/majameen', {
      cache: 'no-store'
    });

    if (!res.ok) return [];

    const data = await res.json();

    return data.data || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function MajameenPage() {
  const majameen = await getMajameen();

  return (
    <div className="p-6 space-y-4">
      {majameen.length === 0 ? (
        <p className="text-center text-gray-500">
          کوئی مضمون دستیاب نہیں
        </p>
      ) : (
        majameen.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded bg-white shadow"
          >
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.author}</p>

            {/* 🔥 FIX: Link instead of <a> */}
            <Link href={`/majameen/${item._id}`}>
              <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                Read
              </button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}