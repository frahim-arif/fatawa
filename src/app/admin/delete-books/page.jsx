'use client';

import { useEffect, useState } from 'react';

export default function DeleteBooksPage() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {

    const res = await fetch(
      'https://f-backend-vdi1.onrender.com/api/books'
    );

    const data = await res.json();

    if (data.success) {
      setBooks(data.books);
    }
  };

  const deleteBook = async (id) => {

    const ok = confirm(
      'Delete this book?'
    );

    if (!ok) return;

    try {

      const res = await fetch(
        `https://f-backend-vdi1.onrender.com/api/admin/books/${id}`,
        {
          method: 'DELETE',
        }
      );

      const data = await res.json();

      if (data.success) {

        alert('Deleted ✅');

        fetchBooks();

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.log(err);

      alert('Delete failed');

    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ef] p-6">

      <h1 className="text-3xl text-center mb-8 font-bold text-red-600">
        Delete Books
      </h1>

      <div className="max-w-4xl mx-auto space-y-4">

        {books.map((book) => (

          <div
            key={book._id}
            className="bg-white border rounded-xl p-4 flex items-center justify-between"
          >

            <div>
              <h2 className="font-bold">
                {book.title}
              </h2>

              <p className="text-sm text-gray-500">
                {book.author}
              </p>
            </div>

            <button
              onClick={() => deleteBook(book._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}