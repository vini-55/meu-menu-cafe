import { useCart } from '../context/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
}

interface MenuCardProps {
  product: Product;
}

export default function MenuCard({ product }: MenuCardProps) {
  // Recuperamos o carrinho, a função de adicionar e a de diminuir
  // Se der erro no 'decreaseQuantity', verifique o nome correto no seu arquivo CartContext.tsx
  const { cart, addToCart, decreaseQuantity } = useCart(); 

  // Verifica se o item já está no carrinho e pega a quantidade
  const cartItem = cart.find((item: any) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="flex flex-col bg-[#f7f7f7] dark:bg-stone-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-stone-200 dark:border-stone-700 h-full">
      
      {/* Imagem */}
      <div className="h-48 w-full relative overflow-hidden bg-stone-200">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badge de quantidade flutuante (opcional, para visualização rápida na imagem) */}
        {quantity > 0 && (
          <div className="absolute top-2 right-2 bg-luna-gold text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            {quantity}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 leading-tight">
            {product.name}
          </h3>
          <span className="text-luna-gold font-bold text-lg whitespace-nowrap ml-2">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
        </div>

        <p className="text-stone-600 dark:text-stone-400 text-sm mb-5 flex-grow font-medium leading-relaxed">
          {product.description}
        </p>

        {/* ÁREA DOS BOTÕES (Lógica de Troca) */}
        <div className="mt-auto">
          {quantity === 0 ? (
            // ESTADO 1: Botão ADICIONAR (Quando não tem no carrinho)
            <button 
              onClick={() => addToCart(product)} 
              className="w-full py-2.5 rounded border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:border-luna-gold hover:text-luna-gold hover:bg-white dark:hover:bg-stone-700 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-sm"
            >
              Adicionar
            </button>
          ) : (
            // ESTADO 2: CONTADOR (Quando já tem no carrinho)
            <div className="flex items-center justify-between bg-white dark:bg-stone-700 rounded border border-luna-gold dark:border-luna-gold/50 shadow-sm overflow-hidden">
              {/* Botão MENOS */}
              <button 
                onClick={() => decreaseQuantity(product.id)}
                className="w-12 h-9 flex items-center justify-center text-stone-500 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-600 transition text-lg font-medium"
              >
                -
              </button>
              
              {/* Número da Quantidade */}
              <span className="font-bold text-luna-gold text-base">
                {quantity}
              </span>

              {/* Botão MAIS */}
              <button 
                onClick={() => addToCart(product)}
                className="w-12 h-9 flex items-center justify-center text-stone-500 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-600 transition text-lg font-medium"
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