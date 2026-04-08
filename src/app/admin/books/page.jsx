'use client';
import { useState } from 'react';

export default function AddBookPage() {
  const [title, setTitle] = useState('');
  const [pdf, setPdf] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let pdfUrl = pdf;

    // Convert Google Drive link (only if provided)
    if (pdf) {
      if (pdf.includes('/d/')) {
        const fileId = pdf.split('/d/')[1]?.split('/')[0];
        pdfUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      } else if (pdf.includes('id=')) {
        const fileId = new URLSearchParams(pdf.split('?')[1]).get('id');
        pdfUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      }
    }

    try {
      const res = await fetch('https://f-backend-vdi1.onrender.com/api/admin/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || '',
          pdf: pdfUrl || '',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage('Book added successfully!');
        setTitle('');
        setPdf('');
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Book</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Book Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
        />

        <input
          type="text"
          placeholder="Google Drive PDF Link (optional)"
          value={pdf}
          onChange={(e) => setPdf(e.target.value)}
          className="w-full border p-2"
        />

        <button className="bg-blue-600 text-white px-4 py-2">
          Add Book
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}