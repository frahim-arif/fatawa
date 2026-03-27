const API = "https://f-backend-vdi1.onrender.com/api";

// ✅ Fetch all courses
export async function getCourses() {
  const res = await fetch(`${API}/courses`, { cache: "no-store" });
  return res.json();
}

// ✅ Fetch single course by slug
export async function getCourse(slug) {
  const res = await fetch(`${API}/courses/${slug}`, { cache: "no-store" });
  return res.json();
}

