import { useCart } from '../context/CartContext';

export default function FloatingCart() {
  const { cart, totalItems, totalPrice } = useCart();
  const PHONE_NUMBER = '5511930401612';

  if (totalItems === 0) return null; // Se vazio, não mostra nada

  const handleCheckout = () => {
    // Monta a mensagem bonita
    let message = `*Olá! Gostaria de fazer um pedido:*\n\n`;
    
    cart.forEach(item => {
      message += `${item.quantity}x ${item.name}\n`;
    });

    const formattedTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice);
    message += `\n*Total: ${formattedTotal}*`;
    message += `\n\n(Pagamento via Pix)`;

    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <button 
        onClick={handleCheckout}
        className="w-full bg-emerald-800 text-white p-4 rounded-xl shadow-2xl flex justify-between items-center hover:bg-emerald-900 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
            {totalItems}
          </div>
          <span className="font-medium">Ver Sacola</span>
        </div>
        
        <span className="font-bold text-lg">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
        </span>
      </button>
    </div>
  );
}