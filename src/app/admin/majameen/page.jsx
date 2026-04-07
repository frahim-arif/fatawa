'use client'
import { useState } from 'react';

export default function AdminMajameen() {
  const [form, setForm] = useState({
    title: '',
    author: '',
    content: ''
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!form.title || !form.content) {
      alert("Title aur Content zaroori hai ❗");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('https://f-backend-vdi1.onrender.com/api/admin/majameen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        alert('Majmoon Added ✅');

        // ✅ Form reset
        setForm({
          title: '',
          author: '',
          content: ''
        });
      } else {
        alert('Error: ' + data.error);
      }

    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl mb-4">Add Majmoon</h1>

      <form onSubmit={submit} className="flex flex-col gap-3">
        
        <input
          value={form.title}
          placeholder="Title"
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="border p-2"
        />

        <input
          value={form.author}
          placeholder="Author"
          onChange={e => setForm({ ...form, author: e.target.value })}
          className="border p-2"
        />

        <textarea
          value={form.content}
          placeholder="Content"
          rows={6}
          onChange={e => setForm({ ...form, content: e.target.value })}
          className="border p-2"
        />

        <button
          disabled={loading}
          className="bg-green-600 text-white p-2"
        >
          {loading ? "Adding..." : "Add"}
        </button>

      </form>
    </div>
  );
}