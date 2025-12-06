import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { client } from '../lib/sanity';
import MenuCard from '../components/MenuCard';
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';
import FloatingCart from '../components/FloatingCart';
import CartModal from '../components/CartModal';
import { useCart } from '../context/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  available: boolean;
  category: string;
  quantity?: string;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Hooks do Router e Carrinho
  const router = useRouter();
  const { setIdentification, identification } = useCart();

  // --- CONFIGURAÇÃO DA IMAGEM DO WHATSAPP ---
  const baseUrl = "https://meu-menu-cafe.vercel.app"; 
  const ogImage = `${baseUrl}/banner-whatsapp.jpg`; // Já configurado com o nome correto

  // Efeito para capturar a mesa da URL
  useEffect(() => {
    if (router.isReady) {
      const { mesa, comanda } = router.query;
      
      if (mesa) {
        setIdentification(`Mesa ${mesa}`);
      } else if (comanda) {
        setIdentification(`Comanda ${comanda}`);
      }
    }
  }, [router.isReady, router.query, setIdentification]);

  if (!products) return <div className="p-10 text-center">Carregando cardápio...</div>;

  const filteredProducts = products.filter(product => {
    if (activeCategory === "Todos") return true;
    return product.category === activeCategory;
  });

  return (
    <div className="min-h-screen pb-24 flex flex-col">
      <Head>
        <title>Café Luna - Menu Digital</title>
        <meta name="description" content="Cardápio digital do Café Luna." />
        
        {/* Meta Tags para WhatsApp */}
        <meta property="og:title" content="Café Luna - Faça seu pedido!" />
        <meta property="og:description" content="Confira nosso cardápio e peça pelo WhatsApp." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 flex-grow w-full">
        <header className="mb-10 text-center pt-10">
          <h1 className="text-4xl font-bold uppercase tracking-wider text-stone-800 dark:text-stone-100 mb-3">
            Nosso Menu
          </h1>
          
          {/* Aviso visual da Mesa */}
          {identification && (
            <span className="inline-block bg-luna-gold text-white text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-widest">
              📍 Você está na {identification}
            </span>
          )}

          <p className="text-stone-600 dark:text-stone-400 text-lg font-medium">
            Escolha o seu pedido.
          </p>
        </header>

        <div className="flex justify-center w-full mb-8">
            <CategoryFilter 
              activeCategory={activeCategory} 
              onSelectCategory={setActiveCategory} 
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((item) => (
            <MenuCard key={item.id} product={item} />
          ))}
          
          {filteredProducts.length === 0 && (
             <div className="col-span-full text-center text-stone-500 py-10">
               Nenhum item encontrado nesta categoria.
             </div>
          )}
        </div>
      </main>

      <footer className="mt-16 py-8 text-center text-sm text-stone-500 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2">
        <p>© Café Luna. Imagens meramente ilustrativas.</p>
        <a 
          href="https://wa.me/5511930401612?text=Ol%C3%A1%20Vin%C3%ADcius%2C%20vi%20o%20menu%20do%20Caf%C3%A9%20Luna%20e%20gostaria%20de%20saber%20mais%20sobre%20seus%20servi%C3%A7os%21"
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-400 hover:text-luna-gold transition-colors duration-300 font-medium text-xs uppercase tracking-wide"
        >
          Desenvolvido por <span className="font-bold">Vinícius Magalhães</span>
        </a>
      </footer>

      <FloatingCart onClick={() => setIsCartOpen(true)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
    </div>
  );
}

export async function getStaticProps() {
  const query = `*[_type == "product"]{
    "id": _id,
    name,
    description,
    price,
    "imageUrl": image.asset->url, 
    tags,
    available,
    category,
    quantity 
  }`;

  const products = await client.fetch(query);

  return {
    props: { products },
    revalidate: 60,
  };
}