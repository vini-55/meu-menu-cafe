export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm py-4 mb-8">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div className="font-bold text-xl text-emerald-700">☕ Café Dev</div>
        <div className="text-sm text-gray-500">Aberto até as 20h</div>
      </div>
    </nav>
  );
}