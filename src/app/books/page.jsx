import Link from "next/link";

async function getBooks() {

  const res = await fetch(
    'https://f-backend-vdi1.onrender.com/api/books',
    {
      cache: 'no-store',
    }
  );

  const data = await res.json();

  return data.books;
}

export default async function BooksPage() {

  const books = await getBooks();

  return (
    <div className="min-h-screen bg-[#fdfaf3] px-4 py-6">

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

      {/* Books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-6xl mx-auto">

        {books.map((book) => (

          <div
            key={book._id}
            className="bg-white border border-[#f0dfb2] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
          >

            {/* Book Link */}
            <Link href={`/books/${book._id}`}>

              {/* Image */}
              {book.image ? (
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-56 object-cover"
                />
              ) : (
                <div className="w-full h-56 bg-[#f8f1dc] flex items-center justify-center text-[#8b6b1b]">
                  No Image
                </div>
              )}

              {/* Content */}
              <div className="p-4">

                <h2
                  className="text-[22px] text-[#8b6b1b] leading-8"
                  style={{
                    fontFamily:
                      "'Jameel Noori Nastaleeq', serif",
                  }}
                >
                  {book.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  ✍️ {book.author || "Unknown"}
                </p>

                {/* Read Button */}
                <button className="mt-4 w-full bg-[#c9a227] hover:bg-[#b8911d] text-white py-2 rounded-lg text-sm transition">
                  Read Book
                </button>

              </div>
            </Link>

            {/* Delete Button
            <div className="px-4 pb-4">

              <Link
                href={`/admin/books/delete/${book._id}`}
              >
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm transition">
                  Delete Book
                </button>
              </Link>

            </div> */}

          </div>
        ))}

      </div>
    </div>
  );
}