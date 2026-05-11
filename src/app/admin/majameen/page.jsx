"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PenBox, User, FileText } from "lucide-react";

export default function AdminMajameen() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      alert("Title aur Content zaroori hai");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://f-backend-vdi1.onrender.com/api/admin/majameen",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Majmoon Added ✅");

        setForm({
          title: "",
          author: "",
          content: "",
        });

        router.push("/majameen");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ef] px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white border border-[#ead89c] rounded-2xl shadow-sm p-6">

        <div className="flex items-center gap-2 mb-6">
          <PenBox className="text-[#8a6a00]" />
          <h1 className="text-2xl font-bold text-[#8a6a00]">
            Add New Majmoon
          </h1>
        </div>

        <form onSubmit={submit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Title
            </label>

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

          {/* Author */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Author
            </label>

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

          {/* Content */}
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

          {/* Button */}
          <button
            disabled={loading}
            className="w-full bg-[#d4b24c] hover:bg-[#c7a53d] transition text-black font-medium py-3 rounded-lg"
          >
            {loading ? "Adding..." : "Add Majmoon"}
          </button>

        </form>
      </div>
    </div>
  );
}