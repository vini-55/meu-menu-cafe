interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ activeCategory, onSelectCategory }: CategoryFilterProps) {
  // 👇 Adicionei "Co-Working" na lista
  const categories = ["Todos", "Cafés", "Salgados", "Doces", "Co-Working"];

  return (
    <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide px-4 md:px-0">
      {categories.map((cat) => (
        <button 
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
            ${activeCategory === cat 
              ? 'bg-emerald-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}