import Image from 'next/image';

interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags?: string[];
  available: boolean;
  quantity?: string; // Campo novo
}

export default function MenuCard({ product }: { product: ProductProps }) {
  const PHONE_NUMBER = '5511999999999'; 

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  const handleOrder = () => {
    if (!product.available) return;
    const message = `Olá! Gostaria de pedir: *${product.name}* (${formattedPrice})`;
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`
      relative flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 
      overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1
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
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">Esgotado</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-900 text-lg leading-tight">{product.name}</h3>
          <span className="font-bold text-emerald-600 text-lg whitespace-nowrap ml-4">{formattedPrice}</span>
        </div>

        {/* AQUI É ONDE A QUANTIDADE APARECE */}
        {product.quantity && (
            <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">
                {product.quantity}
            </p>
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
            <button 
              onClick={handleOrder}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full shadow-lg transition-colors flex items-center justify-center shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}