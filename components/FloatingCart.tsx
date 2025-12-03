import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function FloatingCart() {
  const { cart, totalItems, totalPrice, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false); // Controla se a janela está aberta

  const PHONE_NUMBER = '5511930401612'; // Seu número

  if (totalItems === 0) return null;

  const handleCheckout = () => {
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
    <>
      {/* 1. O BOTÃO FLUTUANTE (Barra Verde) */}
      <div className={`fixed bottom-4 left-4 right-4 z-40 transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button 
          onClick={() => setIsOpen(true)}
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

      {/* 2. A JANELA DE CONFERÊNCIA (Modal) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          
          {/* Cartão Branco */}
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-slideUp">
            
            {/* Cabeçalho */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="font-bold text-lg text-gray-800">Seu Pedido</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Lista de Itens (Com rolagem) */}
            <div className="p-4 overflow-y-auto flex-grow space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded">
                      {item.quantity}x
                    </span>
                    <span className="text-gray-700 font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-900 font-bold">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}
                    </span>
                    {/* Botãozinho de remover item na revisão */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 text-sm font-medium"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Rodapé e Botão Final */}
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500">Total a pagar</span>
                <span className="text-2xl font-extrabold text-emerald-700">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
                </span>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-emerald-700 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Enviar Pedido no WhatsApp</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}