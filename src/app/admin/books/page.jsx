'use client';

import { useState } from 'react';

export default function AddBookPage() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [pdf, setPdf] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {

     let pdfUrl = pdf.trim();
let fileId = "";

// Google Drive File ID
if (pdfUrl.includes("/file/d/")) {
  fileId = pdfUrl.split("/d/")[1]?.split("/")[0] || "";
} 
else if (pdfUrl.includes("/d/")) {
  fileId = pdfUrl.split("/d/")[1]?.split("/")[0] || "";
} 
else if (pdfUrl.includes("id=")) {
  fileId = new URL(pdfUrl).searchParams.get("id") || "";
}

if (!fileId) {
  setMessage("❌ Valid Google Drive PDF link paste karein");
  setLoading(false);
  return;
}

// PDF URL
pdfUrl =
  `https://drive.google.com/uc?export=download&id=${fileId}`;

// PDF ke FIRST PAGE ka thumbnail
const imageUrl =
  `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;

      // ✅ API Request
      const res = await fetch(
        'https://f-backend-vdi1.onrender.com/api/admin/books',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
  title,
  author,
  image: imageUrl,
  pdf: pdfUrl,
}),
        }
      );

      const data = await res.json();

      if (data.success) {

        setMessage('✅ Book Added Successfully');

        // ✅ Reset Fields
        setTitle('');
        setAuthor('');
        setImage('');

        // 🔥 Your Drive Link Auto Fill Again
        setPdf(
          'https://drive.google.com/file/d/16dAtwHpQvW-PXtQdgzoz0IcXGJ8k7qDH/view?usp=sharing'
        );

      } else {

        setMessage(
          '❌ Error: ' + data.error
        );
      }

    } catch (err) {

      setMessage(
        '❌ Server Error: ' + err.message
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ef] px-4 py-10">

      <div className="max-w-xl mx-auto bg-white border border-[#ead89c] rounded-2xl shadow-sm p-6">

        {/* Heading */}
        <div className="text-center mb-6">

          <h1 className="text-3xl font-bold text-[#8a6a00]">
            📚 Add New Book
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Upload Islamic Books Easily
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#7a5a00] mb-1">
              Book Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Enter Book Title"
              className="w-full border border-[#ead89c] bg-[#fffdf7] px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#d4b24c]"
            />
          </div>

          {/* Author
          <div>
            <label className="block text-sm font-medium text-[#7a5a00] mb-1">
              Author Name
            </label>

            <input
              type="text"
              value={author}
              onChange={(e) =>
                setAuthor(e.target.value)
              }
              placeholder="Author Name"
              className="w-full border border-[#ead89c] bg-[#fffdf7] px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#d4b24c]"
            />
          </div> */}
          {/* Image */}
          {/* <div>
            <label className="block text-sm font-medium text-[#7a5a00] mb-1">
              Image URL
            </label>

            <input
              type="text"
              value={image}
              onChange={(e) =>
                setImage(e.target.value)
              }
              placeholder="https://example.com/book.jpg"
              className="w-full border border-[#ead89c] bg-[#fffdf7] px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#d4b24c]"
            />
          </div> */}

          {/* PDF */}
          <div>
            <label className="block text-sm font-medium text-[#7a5a00] mb-1">
              Google Drive PDF Link
            </label>

            <input
              type="text"
              value={pdf}
              onChange={(e) =>
                setPdf(e.target.value)
              }
              placeholder="Paste Google Drive PDF Link"
              className="w-full border border-[#ead89c] bg-[#fffdf7] px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#d4b24c]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c8a645] hover:bg-[#b8932f] text-white font-medium py-3 rounded-xl transition"
          >
            {loading
              ? 'Adding Book...'
              : 'Add Book'}
          </button>

        </form>

        {/* Message */}
        {message && (
          <div className="mt-5 text-center text-sm font-medium text-green-700">
            {message}
          </div>
        )}

      </div>
    </div>
  );
  
}