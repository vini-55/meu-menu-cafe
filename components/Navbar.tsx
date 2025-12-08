import { useState } from 'react';
import Link from 'next/link';
import { useDarkMode } from '../hooks/useDarkMode';
import BillModal from './BillModal';

// Ícone de Tema (Sol/Lua) - Já existia
const ThemeIcon = ({ isDark }: { isDark: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    {isDark ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    )}
  </svg>
);

// NOVO ÍCONE MINIMALISTA PARA A CONTA (Estilo documento/recibo)
const BillIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

const Navbar = () => {
  const [isDark, setIsDark] = useDarkMode(); 
  const [isBillOpen, setIsBillOpen] = useState(false);

  return (
    <>
      <nav className="relative flex justify-center items-center px-6 py-6 bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 transition-colors duration-300 w-full">
        
        {/* BOTÃO DA CONTA (Esquerda) - Ícone atualizado */}
        <div className="absolute left-6">
           <button 
             onClick={() => setIsBillOpen(true)}
             // Ajustei um pouco o tamanho da fonte do texto para equilibrar com o novo ícone
             className="text-sm font-bold uppercase tracking-wider text-stone-500 hover:text-luna-gold flex flex-col items-center gap-1 transition-colors outline-none"
           >
             {/* Substituí o emoji pelo componente BillIcon */}
             <BillIcon />
             <span>Conta</span>
           </button>
        </div>

        {/* LOGO (Centralizada) */}
        <Link href="/" aria-label="Home">
          <div className="flex items-center cursor-pointer">
            <img 
              src="/logo-luna-light.png" 
              alt="Café Luna" 
              className="h-32 w-auto dark:hidden object-contain" 
            />
            <img 
              src="/logo-luna-dark.png" 
              alt="Café Luna" 
              className="h-32 w-auto hidden dark:block object-contain" 
            />
          </div>
        </Link>

        {/* BOTÃO DE TEMA (Direita) */}
        <div className="absolute right-6">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-3 rounded-full text-stone-600 dark:text-stone-300 hover:bg-[#f7f7f7] hover:shadow-sm dark:hover:bg-stone-800 transition focus:outline-none"
          >
            <ThemeIcon isDark={isDark} />
          </button>
        </div>
        
      </nav>

      <BillModal isOpen={isBillOpen} onClose={() => setIsBillOpen(false)} />
    </>
  );
};

export default Navbar;