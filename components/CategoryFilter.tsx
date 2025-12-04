interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = ["Todos", "Cafés", "Salgados", "Doces", "Co-Working"];

export default function CategoryFilter({ activeCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`
            px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm tracking-wide uppercase border
            ${activeCategory === category
              ? "bg-luna-gold text-white shadow-md border-luna-gold scale-105" // Selecionado
              : "bg-[#f7f7f7] text-stone-600 border-stone-200 hover:bg-white hover:border-stone-300 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-700 dark:hover:bg-stone-700" // ALTERAÇÃO: Inativo (#f7f7f7)
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
}