import { useCart } from '../context/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  // Importamos 'removeFromCart' novamente
  const { cart, addToCart, decreaseQuantity, removeFromCart, totalCart, identification, confirmOrderToHistory } = useCart();

  if (!isOpen) return null;

  const handleSendOrder = () => {
    // 1. Gera msg do WhatsApp
    const itemsList = cart.map(item => {
      const itemTotal = (item.price * item.quantityCount).toFixed(2).replace('.', ',');
      return `  ${item.quantityCount}x ${item.name}\n   └ R$ ${itemTotal}`;
    }).join('\n');

    const locationText = identification ? `📍 LOCAL: ${identification}` : '📍 LOCAL: Balcão/Retirada';

    const text = `
NOVO PEDIDO - Café Luna
${locationText}
------------------------------
${itemsList}
------------------------------
  VALOR DESTE PEDIDO: R$ ${totalCart.toFixed(2).replace('.', ',')}
------------------------------
  (Aguarde para fechar a conta total no final)
`;
    
    const encodedText = encodeURIComponent(text);
    const phoneNumber = "5511930401612";

    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
    
    // 2. Move para o histórico e limpa a sacola atual
    confirmOrderToHistory();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Cabeçalho */}
        <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center bg-stone-50 dark:bg-stone-900">
           <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">Itens na Sacola</h2>
           <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center bg-stone-200 dark:bg-stone-800 text-stone-500 hover:bg-stone-300 dark:hover:bg-stone-700 transition">✕</button>
        </div>

        {/* Lista */}
        <div className="flex-grow overflow-y-auto p-5 space-y-6">
            {cart.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-stone-500 mb-4">Sua sacola está vazia.</p>
                    <button onClick={onClose} className="text-luna-gold font-bold hover:underline">
                        Voltar ao menu
                    </button>
                </div>
            ) : (
                cart.map((item) => (
                <div key={item.id} className="flex justify-between items-start border-b border-stone-100 dark:border-stone-800 pb-4 last:border-0">
                    
                    <div className="flex-grow pr-4">
                        <h3 className="font-bold text-stone-800 dark:text-stone-200 text-lg leading-tight">{item.name}</h3>
                        <p className="text-sm text-stone-500 mt-1 line-clamp-1">{item.description}</p>
                        
                        {/* AQUI ESTÁ O BOTÃO QUE VOLTOU! */}
                        <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-red-400 hover:text-red-600 underline mt-2 font-medium"
                        >
                            Remover item
                        </button>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <span className="font-bold text-stone-900 dark:text-luna-gold mb-2">
                            R$ {(item.price * item.quantityCount).toFixed(2).replace('.', ',')}
                        </span>
                        
                        <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 h-8">
                            <button onClick={() => decreaseQuantity(item.id)} className="w-8 h-full flex items-center justify-center text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-l-lg">-</button>
                            <span className="w-8 text-center text-sm font-bold text-stone-800 dark:text-stone-200">{item.quantityCount}</span>
                            <button onClick={() => addToCart(item)} className="w-8 h-full flex items-center justify-center text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-r-lg">+</button>
                        </div>
                    </div>
                </div>
                ))
            )}
        </div>

        {/* Rodapé */}
        {cart.length > 0 && (
          <div className="p-5 bg-stone-50 dark:bg-stone-950 border-t border-stone-100 dark:border-stone-800">
            <div className="flex justify-between items-center mb-4">
              <span className="text-stone-500 text-sm font-medium uppercase tracking-wide">Total desta rodada</span>
              <span className="text-2xl font-bold text-stone-900 dark:text-luna-gold">R$ {totalCart.toFixed(2).replace('.', ',')}</span>
            </div>

            <button 
              onClick={handleSendOrder}
              className="w-full py-3.5 rounded-xl font-bold text-lg shadow-lg bg-stone-900 text-white hover:bg-black dark:bg-luna-gold dark:text-stone-900 dark:hover:bg-[#d4b47d] transition-transform active:scale-[0.98]"
            >
              Enviar para Cozinha
            </button>
          </div>
        )}
      </div>
    </div>
  );
}