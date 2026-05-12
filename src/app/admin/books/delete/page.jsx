'use client';

import { useRouter } from 'next/navigation';

export default function DeleteBook({ params }) {

  const router = useRouter();

  const deleteBook = async () => {

    const ok = confirm(
      'Delete this book?'
    );

    if (!ok) return;

    try {

      const res = await fetch(
        `https://f-backend-vdi1.onrender.com/api/admin/books/${params.id}`,
        {
          method: 'DELETE',
        }
      );

      const data = await res.json();

      if (data.success) {

        alert('Book Deleted ✅');

        router.push('/books');

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.log(err);

      alert('Error deleting');

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8ef]">

      <div className="bg-white border border-[#ead89c] rounded-2xl p-8 shadow-sm text-center">

        <h1 className="text-2xl font-bold text-red-600 mb-3">
          Delete Book
        </h1>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this book?
        </p>

        <button
          onClick={deleteBook}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
        >
          Confirm Delete
        </button>

      </div>

    </div>
  );
}