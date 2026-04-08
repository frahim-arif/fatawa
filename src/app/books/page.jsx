async function getBooks() {
  const res = await fetch('https://f-backend-vdi1.onrender.com/api/books', {
    cache: 'no-store',
  });
  const data = await res.json();
  return data.books;
}

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {books.map((book) => (
        <div key={book._id} className="border p-4 rounded shadow-sm">

          {/* ✅ Image safe check */}
          {book.image ? (
            <img
              src={book.image}
              alt={book.title || 'Book'}
              className="w-full h-40 object-cover rounded"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded">
              <span>No Image</span>
            </div>
          )}

          {/* ✅ Title safe */}
          <h2 className="font-bold mt-2">
            {book.title || 'No Title'}
          </h2>

          {/* ✅ Author safe */}
          {book.author && (
            <p className="text-sm">{book.author}</p>
          )}

          {/* ✅ Only show button if PDF exists */}
          {book.pdf ? (
            <a href={`/books/${book._id}`}>
              <button className="bg-blue-600 text-white px-3 py-1 mt-2 rounded">
                Read Book
              </button>
            </a>
          ) : (
            <p className="text-red-500 mt-2 text-sm">
              No PDF Available
            </p>
          )}

        </div>
      ))}
    </div>
  );
}