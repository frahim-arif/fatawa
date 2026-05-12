async function getBook(id) {

  const res = await fetch(
    `https://f-backend-vdi1.onrender.com/api/books/${id}`,
    {
      cache: 'no-store',
    }
  );

  const data = await res.json();

  return data.book;
}

export default async function BookDetail({ params }) {

  const { id } = await params;

  const book = await getBook(id);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Book Not Found
      </div>
    );
  }

  // Extract Google Drive File ID
  let fileId = "";

  if (book.pdf.includes("/d/")) {

    fileId = book.pdf.split("/d/")[1]?.split("/")[0];

  } else if (book.pdf.includes("id=")) {

    fileId = new URLSearchParams(
      book.pdf.split("?")[1]
    ).get("id");
  }

  const embedUrl =
    `https://drive.google.com/file/d/${fileId}/preview`;

  const downloadUrl =
    `https://drive.google.com/uc?export=download&id=${fileId}`;

  return (
    <div className="min-h-screen bg-[#fdfaf3] px-4 py-8">

      <div className="max-w-5xl mx-auto bg-white border border-[#f0dfb2] rounded-3xl shadow-sm overflow-hidden">

        {/* Top */}
        <div className="p-6 border-b border-[#f3e6bf]">

          <h1
            className="text-4xl text-[#8b6b1b] mb-2"
            style={{
              fontFamily:
                "'Jameel Noori Nastaleeq', serif",
            }}
          >
            {book.title}
          </h1>

          <p className="text-sm text-gray-500">
            ✍️ {book.author || "Unknown"}
          </p>

        </div>

        {/* PDF */}
        <div className="p-4">

          <iframe
            src={embedUrl}
            className="w-full h-[700px] rounded-xl border"
            title={book.title}
          />

          {/* Download */}
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="mt-5 bg-[#c9a227] hover:bg-[#b8911d] text-white px-6 py-3 rounded-xl transition">
              Download PDF
            </button>
          </a>

        </div>

      </div>
    </div>
  );
}