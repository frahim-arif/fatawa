async function getMajmoon(id) {
  try {
    if (!id) return null;

    const res = await fetch(
      `https://f-backend-vdi1.onrender.com/api/majameen/${id}`,
      { cache: 'no-store' }
    );

    if (!res.ok) return null;

    const data = await res.json();

    return data.item || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function Detail(props) {
  // 🔥 IMPORTANT FIX
  const id = props?.params?.id;

  console.log("ID:", id); // debug

  const item = await getMajmoon(id);

  if (!item) {
    return (
      <div className="p-6 text-red-600 text-center">
        مضمون نہیں ملا ❌
        <br />
        <span className="text-sm text-gray-500">
          (ID: {id})
        </span>
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