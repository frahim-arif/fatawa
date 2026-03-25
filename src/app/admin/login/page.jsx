"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/auth/login", { username, password });
      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("adminUser", JSON.stringify(res.data.admin));
        router.push("/admin/questions"); // redirect to admin list page
      } else {
        setMsg(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Admin Login</h2>
        {msg && <div className="mb-3 text-red-600">{msg}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" className="w-full p-2 border rounded" />
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border rounded" />
          <button className="w-full py-2 bg-green-600 text-white rounded">Login</button>
        </form>
      </div>
    </div>
  );
}
