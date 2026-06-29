"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PenBox, User, FileText, Trash2, Eye } from "lucide-react";

export default function AdminMajameen() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
  });

  const [majameen, setMajameen] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = "https://f-backend-vdi1.onrender.com";

  useEffect(() => {
    fetchMajameen();
  }, []);

  const fetchMajameen = async () => {
    try {
      const res = await fetch(`${API}/api/majameen`);
      const data = await res.json();

      if (data.success) {
        setMajameen(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      alert("Title aur Content zaroori hai");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API}/api/admin/majameen`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Majmoon Added ✅");

        setForm({
          title: "",
          author: "",
          content: "",
        });

        fetchMajameen();
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const deleteMajmoon = async (id) => {
    const confirmDelete = confirm("Kya aap is majmoon ko delete karna chahte hain?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API}/api/admin/majameen/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Deleted ✅");
        fetchMajameen();
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ef] px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-white border border-[#ead89c] rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <PenBox className="text-[#8a6a00]" />
            <h1 className="text-2xl font-bold text-[#8a6a00]">
              Add New Majmoon
            </h1>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Title</label>

              <div className="flex items-center border rounded-lg overflow-hidden">
                <div className="px-3 text-gray-500">
                  <FileText size={18} />
                </div>

                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="Enter Title"
                  className="w-full p-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">Author</label>

              <div className="flex items-center border rounded-lg overflow-hidden">
                <div className="px-3 text-gray-500">
                  <User size={18} />
                </div>

                <input
                  type="text"
                  value={form.author}
                  onChange={(e) =>
                    setForm({ ...form, author: e.target.value })
                  }
                  placeholder="Author Name"
                  className="w-full p-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Content
              </label>

              <textarea
                rows={10}
                value={form.content}
                onChange={(e) =>
                  setForm({ ...form, content: e.target.value })
                }
                placeholder="Write Majmoon..."
                className="w-full border rounded-lg p-4 outline-none resize-none"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#d4b24c] hover:bg-[#c7a53d] transition text-black font-medium py-3 rounded-lg"
            >
              {loading ? "Adding..." : "Add Majmoon"}
            </button>
          </form>
        </div>

        <div className="bg-white border border-[#ead89c] rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#8a6a00] mb-4">
            Existing Majameen
          </h2>

          <div className="space-y-3">
            {majameen.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between gap-3 border rounded-xl p-4"
              >
                <div>
                  <h3 className="font-bold text-[#8a6a00]">{item.title}</h3>
                  <p className="text-xs text-gray-500">
                    ✍️ {item.author || "Admin"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/majameen/${item._id}`}
                    className="p-2 rounded-lg bg-blue-100 text-blue-700"
                  >
                    <Eye size={18} />
                  </Link>

                  <button
                    onClick={() => deleteMajmoon(item._id)}
                    className="p-2 rounded-lg bg-red-100 text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            {majameen.length === 0 && (
              <p className="text-center text-gray-500">
                Abhi koi majmoon nahi hai.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}