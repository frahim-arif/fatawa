async function getMajmoon(id) {
 const res = await fetch(`https://f-backend-vdi1.onrender.com/api/majameen/${id}`, {
  cache: 'no-store'
});
  const data = await res.json();
  return data.item;
}

export default async function Detail({ params }) {
  const item = await getMajmoon(params.id);

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