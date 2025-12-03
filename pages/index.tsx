import { useState } from 'react';
import Head from 'next/head';
import { client } from '../lib/sanity';
import MenuCard from '../components/MenuCard';
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  available: boolean;
  category: string;
  quantity?: string; // Campo novo
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [activeCategory, setActiveCategory] = useState("Todos");

  if (!products) return <div className="p-10 text-center">Carregando cardápio...</div>;

  const filteredProducts = products.filter(product => {
    if (activeCategory === "Todos") return true;
    return product.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-10 flex flex-col">
      <Head>
        <title>Menu da Cafeteria</title>
      </Head>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 flex-grow w-full">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Nosso Menu</h1>
          <p className="text-gray-500">Escolha o seu pedido.</p>
        </header>

        <div className="flex justify-center w-full">
            <CategoryFilter 
              activeCategory={activeCategory} 
              onSelectCategory={setActiveCategory} 
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredProducts.map((item) => (
            <MenuCard key={item.id} product={item} />
          ))}
          
          {filteredProducts.length === 0 && (
             <div className="col-span-full text-center text-gray-400 py-10">
               Nenhum item encontrado nesta categoria.
             </div>
          )}
        </div>
      </main>

      {/* RODAPÉ COM AVISO LEGAL */}
      <footer className="mt-12 py-6 text-center text-xs text-gray-400 border-t border-gray-200">
        <p>* Imagens meramente ilustrativas.</p>
        <p>Preços e disponibilidade sujeitos a alteração sem aviso prévio.</p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  // AQUI ADICIONAMOS "quantity" NA BUSCA
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