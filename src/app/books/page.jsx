import Link from "next/link";

async function getBooks() {
  const res = await fetch(
    "https://f-backend-vdi1.onrender.com/api/books",
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data.books;
}

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="min-h-screen bg-[#fdfaf3] px-2 py-6">

      {/* Header */}
      <div className="text-center mb-8">

        <h1
          className="text-4xl text-[#8b6b1b]"
          style={{
            fontFamily:
              "'Jameel Noori Nastaleeq', serif",
          }}
        >
          📚 اسلامی کتب
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Read & Download Islamic Books
        </p>

      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-6xl mx-auto">

        {books.map((book) => {

          // Extract Google Drive File ID
          let fileId = "";

          if (book.pdf.includes("/d/")) {

            fileId =
              book.pdf
                .split("/d/")[1]
                ?.split("/")[0];

          } else if (
            book.pdf.includes("id=")
          ) {

            fileId = new URLSearchParams(
              book.pdf.split("?")[1]
            ).get("id");
          }

          const previewUrl =
            `https://drive.google.com/file/d/${fileId}/preview`;

          return (
            <div
              key={book._id}
              className="w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
            >

              {/* Book Link */}
              <Link
                href={`/books/${book._id}`}
              >

                {/* PDF First Page Preview */}
                <iframe
                  src={previewUrl}
                  title={book.title}
                  className="w-full h-64 border-0"
                />

                {/* Content */}
                <div className="p-4">

                  <h2
                    className="text-[24px] text-[#8b6b1b] leading-9"
                    style={{
                      fontFamily:
                        "'Jameel Noori Nastaleeq', serif",
                    }}
                  >
                    {book.title}
                  </h2>

                  {/* <p className="text-sm text-gray-500 mt-1">
                    ✍️{" "}
                    {book.author ||
                      "Unknown"}
                  </p> */}

                  {/* Read Button */}
                  <button className="mt-4 w-full bg-[#c9a227] hover:bg-[#b8911d] text-white py-3 rounded-xl text-sm transition">
                    Read Book
                  </button>

                </div>

              </Link>

            </div>
          );
        })}

      </div>
    </div>
  );
  
}