async function getMajameen() {
  try {
    const res = await fetch('https://f-backend-vdi1.onrender.com/api/majameen', {
      cache: 'no-store'
    });

    const data = await res.json();

    return data.data || []; // 🔥 safe fallback
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
        <p>کوئی مضمون دستیاب نہیں</p>
      ) : (
        majameen.map((item) => (
          <div key={item._id} className="border p-4 rounded bg-white">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.author}</p>

            <a href={`/majameen/${item._id}`}>
              <button className="mt-2 bg-green-600 text-white px-3 py-1">
                Read
              </button>
            </a>
          </div>
        ))
      )}
    </div>
  );
}