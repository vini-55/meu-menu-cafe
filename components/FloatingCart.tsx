import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function FloatingCart() {
  const { cart, totalItems, totalPrice, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // 👇 SEUS DADOS
  const PHONE_NUMBER = '5511930401612'; 
  const PIX_KEY = '11930401612'; // Sua chave Pix (Telefone/CPF/Email)
  const MERCHANT_NAME = 'Café Dev'; // Nome que aparece no banco

  if (totalItems === 0) return null;

  const handleCheckout = () => {
    // 1. Cabeçalho do Pedido
    let message = `🧾 *NOVO PEDIDO - ${MERCHANT_NAME}*\n`;
    message += `------------------------------\n`;
    
    // 2. Lista de Itens
    cart.forEach(item => {
      const itemTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity);
      message += `▪️ ${item.quantity}x *${item.name}*\n   └ ${itemTotal}\n`;
    });

    // 3. Totais e Pagamento
    const formattedTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice);
    
    message += `------------------------------\n`;
    message += `💰 *TOTAL: ${formattedTotal}*\n`;
    message += `------------------------------\n\n`;
    
    message += `📲 *DADOS PARA PAGAMENTO (PIX)*\n`;
    message += `Chave: ${PIX_KEY}\n`;
    message += `Favorecido: ${MERCHANT_NAME}\n\n`;
    
    message += `📍 *Envie o comprovante para confirmarmos o pedido.*`;

    // Codifica para URL
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
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

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-slideUp">
            
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="font-bold text-lg text-gray-800">Seu Pedido</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors">✕</button>
            </div>

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
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 text-sm font-medium">Remover</button>
                  </div>
                </div>
              ))}
            </div>

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
                <span>Finalizar no WhatsApp</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}