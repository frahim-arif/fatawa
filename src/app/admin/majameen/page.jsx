'use client'
import { useState } from 'react';

export default function AdminMajameen() {
  const [form, setForm] = useState({
    title: '',
    author: '',
    content: ''
  });

  const submit = async (e) => {
    e.preventDefault();

    await fetch('https://f-backend-vdi1.onrender.com/api/admin/majameen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    alert('Majmoon Added ✅');
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl mb-4">Add Majmoon</h1>

      <form onSubmit={submit} className="flex flex-col gap-3">
        <input placeholder="Title" onChange={e => setForm({...form, title: e.target.value})} />
        <input placeholder="Author" onChange={e => setForm({...form, author: e.target.value})} />

        <textarea
          placeholder="Content"
          rows={6}
          onChange={e => setForm({...form, content: e.target.value})}
        />

        <button className="bg-green-600 text-white p-2">
          Add
        </button>
      </form>
    </div>
  );
}