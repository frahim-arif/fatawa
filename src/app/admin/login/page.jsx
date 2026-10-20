"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API = "https://f-backend-vdi1.onrender.com/api";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // pehle se login ho to seedha andar bhej do
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      router.replace("/admin/ask-questions");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password) {
      setMsg("Username aur password likhein");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const res = await axios.post(
        `${API}/admin/auth/login`,
        { username: username.trim(), password },
        { timeout: 60000 } // Render soya ho to intezar karein
      );

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("adminUser", JSON.stringify(res.data.admin));
        router.push("/admin/ask-questions");
      } else {
        setMsg(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      if (err.code === "ECONNABORTED") {
        setMsg("Server jaag raha hai, thodi der baad dobara try karein");
      } else {
        setMsg(err.response?.data?.message || "Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Admin Login</h2>

        {msg && <div className="mb-3 text-red-600">{msg}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="username"
            className="w-full p-2 border rounded"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Login ho raha hai..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}