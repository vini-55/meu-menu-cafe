import { useCart } from '../context/CartContext';

interface FloatingCartProps {
  onClick: () => void;
}

export default function FloatingCart({ onClick }: FloatingCartProps) {
  // CORREÇÃO: Trocamos 'total' por 'totalCart'
  const { cartCount, totalCart } = useCart();

  if (cartCount === 0) return null;

  return (
    <div className="fixed bottom-4 left-0 w-full px-4 z-50 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <button 
          onClick={onClick}
          className="w-full p-4 rounded-xl shadow-2xl flex justify-between items-center transition-transform hover:scale-[1.01] active:scale-[0.99] border border-stone-700 dark:border-stone-200
                     bg-stone-900 text-white hover:bg-stone-800 
                     dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
        >
          <div className="flex items-center gap-3">
            <div className="bg-luna-gold text-stone-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
              {cartCount}
            </div>
            <span className="font-medium">Ver sua sacola</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="opacity-70 text-sm font-normal">Total:</span>
            <span className="font-bold text-xl">
              {/* CORREÇÃO: Usando totalCart e protegendo contra erros (NaN) */}
              R$ {isNaN(totalCart) ? '0,00' : totalCart.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}