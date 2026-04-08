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
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="font-bold mt-2">{book.title}</h2>
          <p className="text-sm">{book.author}</p>

          <a href={`/books/${book._id}`}>
            <button className="bg-blue-600 text-white px-3 py-1 mt-2 rounded">
              Read Book
            </button>
          </a>
        </div>
      ))}
    </div>
  );
}