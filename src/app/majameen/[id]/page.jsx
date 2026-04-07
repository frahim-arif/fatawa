async function getMajmoon(id) {
  try {
    const res = await fetch(`https://f-backend-vdi1.onrender.com/api/majameen/${id}`, {
      cache: 'no-store'
    });

    // ❗ ye add karo (IMPORTANT)
    if (!res.ok) {
      console.log("API not working");
      return null;
    }

    const data = await res.json();

    console.log("API RESPONSE:", data); // 🔍 debug

    return data.item ? data.item : null;

  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

export default async function Detail({ params }) {

  console.log("PARAM ID:", params.id); // 🔍 debug

  const item = await getMajmoon(params.id);

  // ❗ strong check
  if (!item || !item._id) {
    return (
      <div className="p-6 text-red-600 text-center">
        مضمون نہیں ملا ❌
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{item.title}</h1>

      <p className="text-sm text-gray-500 mb-4">{item.author}</p>

      <div className="leading-8 text-lg whitespace-pre-line">
        {item.content}
      </div>
    </div>
  );
}