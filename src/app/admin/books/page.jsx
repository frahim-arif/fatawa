'use client'; // If using Next.js 13 app directory for client-side interactivity
import { useState } from 'react';

export default function AddBookPage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [pdf, setPdf] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Convert My Drive link to shareable PDF link automatically
    let pdfUrl = pdf;

    if (pdf.includes('/file/d/')) {
      // normal Google Drive file link
      const fileId = pdf.split('/d/')[1]?.split('/')[0];
      pdfUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    } else if (pdf.includes('id=')) {
      const fileId = new URLSearchParams(pdf.split('?')[1]).get('id');
      pdfUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    // Else, leave the URL as is

    try {
      const res = await fetch('https://f-backend-vdi1.onrender.com/api/admin/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          image,
          pdf: pdfUrl,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage('Book added successfully!');
        setTitle('');
        setAuthor('');
        setImage('');
        setPdf('');
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/book-cover.jpg"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">PDF Google Drive URL</label>
          <input
            type="text"
            value={pdf}
            onChange={(e) => setPdf(e.target.value)}
            placeholder="https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Book
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}