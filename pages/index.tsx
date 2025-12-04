import { useState } from 'react';
import Head from 'next/head';
import { client } from '../lib/sanity';
import MenuCard from '../components/MenuCard';
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';
import FloatingCart from '../components/FloatingCart';
import CartModal from '../components/CartModal';

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

  // --- CONFIGURAÇÃO DO LINK (IMPORTANTE) ---
  // Quando você subir o site (na Vercel, por exemplo), troque este link pelo seu oficial.
  // Exemplo: const baseUrl = "https://cafedevexemplo.vercel.app";
  const baseUrl = "https://seu-site-aqui.com"; 

  // URL da imagem que vai aparecer no WhatsApp
  // O ideal é criar uma imagem de 1200x630px chamada "banner-zap.jpg" e por na pasta public
  // Por enquanto, vou usar o seu logo dark que já existe.
  const ogImage = `${baseUrl}/logo-luna-dark.jpg`;

  if (!products) return <div className="p-10 text-center">Carregando cardápio...</div>;

  const filteredProducts = products.filter(product => {
    if (activeCategory === "Todos") return true;
    return product.category === activeCategory;
  });

  return (
    <div className="min-h-screen pb-24 flex flex-col">
      <Head>
        <title>Café Luna - Menu Digital</title>
        <meta name="description" content="Cardápio digital do Café Luna. Torrefação Artesanal." />

        {/* --- META TAGS PARA WHATSAPP & REDES SOCIAIS --- */}
        {/* Título que aparece no zap */}
        <meta property="og:title" content="Café Luna - Faça seu pedido!" />
        
        {/* Descriçãozinha embaixo do título */}
        <meta property="og:description" content="Confira nosso cardápio de cafés especiais, salgados e doces. Peça direto pelo WhatsApp." />
        
        {/* Tipo do site */}
        <meta property="og:type" content="website" />
        
        {/* A Imagem (Obrigatório ser link completo com https://) */}
        <meta property="og:image" content={ogImage} />
        
        {/* Tamanhos para ajudar o WhatsApp a carregar rápido */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 flex-grow w-full">
        <header className="mb-10 text-center pt-10">
          <h1 className="text-4xl font-bold uppercase tracking-wider text-stone-800 dark:text-stone-100 mb-3">
            Nosso Menu
          </h1>
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

      <footer className="mt-16 py-8 text-center text-sm text-stone-500 border-t border-stone-200 dark:border-stone-800">
        <p>© Café Luna. Imagens meramente ilustrativas.</p>
      </footer>

      {/* COMPONENTES DO CARRINHO */}
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