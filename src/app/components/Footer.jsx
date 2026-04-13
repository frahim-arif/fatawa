<footer className="relative mt-10">

  {/* 🔥 Base Color */}
  <div className="absolute inset-0 bg-[#3b2f2f]" />

  {/* 🔥 Pattern Overlay */}
  <div
    className="absolute inset-0 opacity-10"
    style={{
      backgroundImage: "url('/images/1943.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />

  {/* 🔥 Content */}
  <div className="relative max-w-6xl mx-auto px-4 py-8 text-yellow-200 text-center space-y-4">

    {/* Title */}
    <h2 className="text-xl md:text-2xl font-bold text-yellow-300">
      مسلک دیوبند
    </h2>

    {/* Links */}
    <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
      <a href="/" className="hover:text-yellow-400">ہوم</a>
      <a href="/about" className="hover:text-yellow-400">About</a>
      <a href="/contact" className="hover:text-yellow-400">Contact</a>
      <a href="/privacy" className="hover:text-yellow-400">Privacy</a>
      <a href="/terms" className="hover:text-yellow-400">Terms</a>
    </div>

    {/* Divider */}
    <div className="border-t border-yellow-700 my-4"></div>

    {/* Copyright */}
    <p className="text-xs md:text-sm text-yellow-300">
      © {new Date().getFullYear()} Maslak e Deoband. All rights reserved.
    </p>

  </div>
</footer>