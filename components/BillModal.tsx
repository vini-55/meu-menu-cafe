import { useCart } from '../context/CartContext';

interface BillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BillModal({ isOpen, onClose }: BillModalProps) {
  const { history, cart, totalGrand, closeTab, identification } = useCart();

  if (!isOpen) return null;

  // Junta o histórico com o carrinho atual para mostrar tudo
  // (Opcional: você pode separar visualmente se quiser)
  const allItems = [...history];
  
  // Adiciona itens do carrinho atual ao resumo visual
  cart.forEach(cartItem => {
    const existing = allItems.find(i => String(i.id) === String(cartItem.id));
    if (existing) {
       // Apenas para visualização, não altera o state original
       // Precisamos clonar para não bugar o React
       existing.quantityCount += cartItem.quantityCount; 
    } else {
       allItems.push({...cartItem});
    }
  });

  const handleCloseTab = () => {
    const itemsList = allItems.map(item => {
      const itemTotal = (item.price * item.quantityCount).toFixed(2).replace('.', ',');
      return `  ${item.quantityCount}x ${item.name}\n   └ R$ ${itemTotal}`;
    }).join('\n');

    const locationText = identification ? `📍 LOCAL: ${identification}` : '📍 LOCAL: Balcão';

    const text = `
🏁 FECHAMENTO DE CONTA - Café Luna
${locationText}
------------------------------
RESUMO DO CONSUMO:
${itemsList}
------------------------------
  TOTAL FINAL: R$ ${totalGrand.toFixed(2).replace('.', ',')}
------------------------------
  DADOS PARA PIX:
  Chave: 11930401612
  Favorecido: Café Luna
------------------------------
  Solicito o fechamento da conta.
`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5511930401612?text=${encodedText}`, '_blank');
    
    closeTab(); // Limpa tudo (dia seguinte começa do zero)
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-luna-gold">
        
        <div className="p-5 bg-luna-gold flex justify-between items-center">
           <h2 className="text-xl font-bold text-white uppercase tracking-wider">Fechar Conta</h2>
           <button onClick={onClose} className="text-white font-bold text-xl">✕</button>
        </div>

        <div className="flex-grow overflow-y-auto p-5 space-y-4">
            <p className="text-sm text-center text-stone-500 mb-4">
              Confira abaixo tudo o que foi consumido na sua mesa hoje.
            </p>

            {allItems.length === 0 ? (
                <p className="text-center font-bold text-stone-400">Nenhum consumo registrado.</p>
            ) : (
                allItems.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="flex justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                        <span className="text-stone-800 dark:text-stone-300">
                            <span className="font-bold text-luna-gold">{item.quantityCount}x</span> {item.name}
                        </span>
                        <span className="font-medium text-stone-600 dark:text-stone-400">
                            R$ {(item.price * item.quantityCount).toFixed(2).replace('.', ',')}
                        </span>
                    </div>
                ))
            )}
        </div>

        <div className="p-5 bg-stone-50 dark:bg-stone-950">
            <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-stone-600 dark:text-stone-400">TOTAL A PAGAR</span>
                <span className="text-3xl font-bold text-stone-900 dark:text-luna-gold">
                    R$ {totalGrand.toFixed(2).replace('.', ',')}
                </span>
            </div>
            
            <button 
                onClick={handleCloseTab}
                className="w-full py-4 rounded-xl font-bold text-xl shadow-lg bg-green-600 text-white hover:bg-green-700 transition-transform active:scale-[0.98]"
            >
                💸 Pagar com PIX
            </button>
        </div>

      </div>
    </div>
  );
}