async function getBook(id) {
  const res = await fetch(
    `https://f-backend-vdi1.onrender.com/api/books/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data.book;
}

export default async function BookDetail({
  params,
}) {
  const { id } = await params;

  const book = await getBook(id);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Book Not Found
      </div>
    );
  }

  // Extract Google Drive File ID
  let fileId = "";

  if (book.pdf.includes("/d/")) {
    fileId =
      book.pdf.split("/d/")[1]?.split("/")[0];
  } else if (book.pdf.includes("id=")) {
    fileId = new URLSearchParams(
      book.pdf.split("?")[1]
    ).get("id");
  }

  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  return (
    <div className="min-h-screen bg-[#fdfaf3] px-2 sm:px-4 py-4">

      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* Top Section */}
        <div className="p-4 sm:p-6">

          <h1
            className="text-3xl sm:text-4xl text-[#8b6b1b] leading-[60px]"
            style={{
              fontFamily:
                "'Jameel Noori Nastaleeq', serif",
            }}
          >
            {book.title}
          </h1>

          {/* <p className="text-sm text-gray-500 mt-1">
            ✍️ {book.author || "Unknown"}
          </p> */}

        </div>

        {/* PDF Viewer */}
        <div className="px-2 sm:px-4 pb-4">

          <iframe
            src={embedUrl}
            title={book.title}
            className="w-full h-[75vh] sm:h-[85vh] rounded-xl"
            allow="autoplay"
          />

          {/* Download Button */}
          <div className="mt-4">

            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full sm:w-auto bg-[#c9a227] hover:bg-[#b8911d] text-white px-6 py-3 rounded-xl transition">
                Download PDF
              </button>
            </a>

          </div>

        </div>

      </div>
    </div>
  );
}