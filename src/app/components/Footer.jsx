"use client";

export default function Footer() {
  return (
    <footer className="relative mt-6">

  {/* Background */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-[#3b2f2f]" />
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: "url('/images/1943.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  </div>

  {/* Content */}
  <div className="max-w-6xl mx-auto px-3 py-5 text-yellow-200 text-center space-y-2">

    {/* Title */}
    <h2 className="text-lg md:text-xl font-semibold text-yellow-300">
      مسلک دیوبند
    </h2>

    {/* Links */}
    <div className="flex flex-wrap justify-center gap-3 text-xs md:text-sm">
      <a href="/" className="hover:text-yellow-400 transition">ہوم</a>
      <a href="/about" className="hover:text-yellow-400 transition">About</a>
      <a href="/contact" className="hover:text-yellow-400 transition">Contact</a>
      <a href="/privacy" className="hover:text-yellow-400 transition">Privacy</a>
      <a href="/terms" className="hover:text-yellow-400 transition">Terms</a>
    </div>

    {/* Divider */}
    <div className="border-t border-yellow-700 my-2"></div>

    {/* Copyright */}
    <p className="text-[10px] md:text-xs text-yellow-300">
      © {new Date().getFullYear()} Maslak e Deoband
    </p>

  </div>
</footer>
  );
}