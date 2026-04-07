async function getBooks() {
  const res = await fetch('http://localhost:5000/api/books', {
    cache: 'no-store'
  });

  const data = await res.json();
  return data.books;
}

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {books.map((book) => (
        <div key={book._id} className="border p-4 rounded">
          <img src={book.image} className="w-full h-40 object-cover" />

          <h2 className="font-bold mt-2">{book.title}</h2>
          <p className="text-sm">{book.author}</p>

          <a href={`/books/${book._id}`}>
            <button className="bg-blue-600 text-white px-3 py-1 mt-2">
              Read Book
            </button>
          </a>
        </div>
      ))}
    </div>
  );
}