import Link from 'next/link';
import { useDarkMode } from '../hooks/useDarkMode';

// O Ícone Minimalista (SVG) está de volta
const ThemeIcon = ({ isDark }: { isDark: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    {isDark ? (
      // Lua (Modo Escuro)
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    ) : (
      // Sol (Modo Claro)
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    )}
  </svg>
);

const Navbar = () => {
  const [isDark, setIsDark] = useDarkMode(); 

  return (
    <nav className="flex justify-between items-center px-6 py-6 bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 transition-colors duration-300 w-full">
      <Link href="/" aria-label="Home">
        <div className="flex items-center cursor-pointer">
          {/* ATUALIZADO PARA .PNG */}
          <img 
            src="/logo-luna-light.png" 
            alt="Café Luna" 
            className="h-32 w-auto dark:hidden object-contain" 
          />
          {/* ATUALIZADO PARA .PNG */}
          <img 
            src="/logo-luna-dark.png" 
            alt="Café Luna" 
            className="h-32 w-auto hidden dark:block object-contain" 
          />
        </div>
      </Link>

      <button 
        onClick={() => setIsDark(!isDark)}
        // Voltei o hover para um tom de pedra suave em vez do dourado forte, fica mais elegante com o ícone minimalista
        className="p-3 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition focus:outline-none"
      >
        <ThemeIcon isDark={isDark} />
      </button>
    </nav>
  );
};

export default Navbar;