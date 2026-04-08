async function getBook(id) {
  const res = await fetch(`https://f-backend-vdi1.onrender.com/api/books/${id}`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return data.book;
}

export default async function BookDetail({ params }) {
  const book = await getBook(params.id);

  // Extract fileId from Google Drive link
  let fileId;
  if (book.pdf.includes('/d/')) {
    fileId = book.pdf.split('/d/')[1]?.split('/')[0];
  } else if (book.pdf.includes('id=')) {
    fileId = new URLSearchParams(book.pdf.split('?')[1]).get('id');
  }

  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p className="text-sm mb-4">{book.author}</p>

      {/* Embed PDF */}
      <iframe
        src={embedUrl}
        className="w-full h-[600px] border rounded"
        title={book.title}
      />

      {/* Download Button */}
      <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
        <button className="bg-green-600 text-white px-4 py-2 mt-4 rounded">
          Download
        </button>
      </a>
    </div>
  );
}