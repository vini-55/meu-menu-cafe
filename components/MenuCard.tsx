import Image from 'next/image';
import { useCart } from '../context/CartContext'; // Importamos o carrinho

interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags?: string[];
  available: boolean;
  quantity?: string;
}

export default function MenuCard({ product }: { product: ProductProps }) {
  // Agora pegamos também o 'cart' e o 'removeFromCart'
  const { addToCart, removeFromCart, cart } = useCart(); 

  // Verifica quantos deste item já estão na sacola
  const cartItem = cart.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
    // Vibração tátil
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
    // Vibração tátil
    if (navigator.vibrate) navigator.vibrate(50);
  };

  return (
    <div className={`
      relative flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 
      overflow-hidden transition-all duration-300 hover:shadow-xl
      ${!product.available ? 'opacity-75 grayscale pointer-events-none' : ''}
    `}>
      
      <div className="relative h-48 w-full bg-gray-200">
        {product.imageUrl && (
           <Image 
             src={product.imageUrl} 
             alt={product.name}
             fill
             className="object-cover"
             sizes="(max-width: 768px) 100vw, 33vw"
           />
        )}
        {!product.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold uppercase">Esgotado</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-900 text-lg leading-tight">{product.name}</h3>
          <span className="font-bold text-emerald-600 text-lg whitespace-nowrap ml-4">{formattedPrice}</span>
        </div>

        {product.quantity && (
            <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">{product.quantity}</p>
        )}

        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">
          {product.description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {product.tags?.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] uppercase font-bold rounded tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          {product.available && (
            // LÓGICA DO BOTÃO:
            // Se tiver na sacola, mostra os controles (+ e -)
            quantityInCart > 0 ? (
                <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1 shadow-inner border border-gray-100">
                    <button
                        onClick={handleRemove}
                        className="w-8 h-8 flex items-center justify-center bg-white text-emerald-700 rounded-full shadow-sm hover:bg-gray-100 transition-colors font-bold text-lg"
                    >
                        −
                    </button>
                    <span className="text-sm font-bold text-gray-700 min-w-[1rem] text-center">{quantityInCart}</span>
                    <button
                        onClick={handleAdd}
                        className="w-8 h-8 flex items-center justify-center bg-emerald-600 text-white rounded-full shadow-md hover:bg-emerald-700 transition-colors font-bold text-lg"
                    >
                        +
                    </button>
                </div>
            ) : (
                // Se não tiver, mostra o botão normal de adicionar
                <button 
                  onClick={handleAdd}
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white p-2 rounded-full shadow-lg transition-all flex items-center justify-center shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}