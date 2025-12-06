import { useCart } from '../context/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  // ADICIONEI DE VOLTA O CAMPO 'quantity' (Texto do peso/porção)
  quantity?: string; 
}

interface MenuCardProps {
  product: Product;
}

export default function MenuCard({ product }: MenuCardProps) {
  const { cart, addToCart, decreaseQuantity } = useCart();

  // Comparação segura de IDs (String vs String)
  const cartItem = cart.find((item) => String(item.id) === String(product.id));
  const count = cartItem?.quantity || 0; // 'count' é o contador do carrinho (1, 2, 3...)

  return (
    <div className="flex flex-col bg-[#f7f7f7] dark:bg-stone-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-stone-200 dark:border-stone-700 h-full">
      
      {/* Imagem */}
      <div className="h-48 w-full relative overflow-hidden bg-stone-200">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        {/* Badge do contador (carrinho) */}
        {count > 0 && (
          <div className="absolute top-2 right-2 bg-luna-gold text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md animate-bounce-in">
            {count}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Título e Preço */}
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 leading-tight">
            {product.name}
          </h3>
          <span className="text-luna-gold font-bold text-lg whitespace-nowrap ml-2">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
        </div>

        {/* AQUI ESTÁ A CORREÇÃO: A QUANTIDADE/PESO VOLTOU! */}
        {/* Exibe apenas se o campo existir no Sanity */}
        {product.quantity && (
          <p className="text-xs font-bold text-stone-500 dark:text-stone-500 mb-2 uppercase tracking-wide">
            {product.quantity}
          </p>
        )}

        {/* Descrição */}
        <p className="text-stone-600 dark:text-stone-400 text-sm mb-5 flex-grow font-medium leading-relaxed">
          {product.description}
        </p>

        {/* Botões de Ação */}
        <div className="mt-auto">
          {count === 0 ? (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="w-full py-2.5 rounded border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:border-luna-gold hover:text-luna-gold hover:bg-white dark:hover:bg-stone-700 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-sm"
            >
              Adicionar
            </button>
          ) : (
            <div className="flex items-center justify-between bg-white dark:bg-stone-700 rounded border border-luna-gold dark:border-luna-gold/50 shadow-sm overflow-hidden h-9">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseQuantity(product.id);
                }}
                className="w-12 h-full flex items-center justify-center text-stone-500 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-600 transition text-lg font-medium"
              >
                -
              </button>
              
              <span className="font-bold text-luna-gold text-base min-w-[20px] text-center">
                {count}
              </span>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="w-12 h-full flex items-center justify-center text-stone-500 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-600 transition text-lg font-medium"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}