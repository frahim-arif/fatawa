async function getBook(id) {
  const res = await fetch(`http://localhost:5000/api/books/${id}`, {
    cache: 'no-store'
  });

  const data = await res.json();
  return data.book;
}

export default async function BookDetail({ params }) {
  const book = await getBook(params.id);

  // 🔥 Google Drive link convert
  const fileId = book.pdf.split('/d/')[1]?.split('/')[0];

  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>

      {/* 📖 READ */}
      <iframe
        src={embedUrl}
        className="w-full h-[600px] border"
      />

      {/* ⬇️ DOWNLOAD */}
      <a href={downloadUrl}>
        <button className="bg-green-600 text-white px-4 py-2 mt-4">
          Download
        </button>
      </a>
    </div>
  );
}