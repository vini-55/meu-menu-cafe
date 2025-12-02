import { useState } from 'react';
import Head from 'next/head';
import { client } from '../lib/sanity'; // Conexão com o Sanity
import MenuCard from '../components/MenuCard';
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';

// Tipagem dos dados que vêm do Sanity
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  available: boolean;
  category: string;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Proteção caso o banco demore a responder
  if (!products) return <div className="p-10 text-center">Carregando cardápio...</div>;

  const filteredProducts = products.filter(product => {
    if (activeCategory === "Todos") return true;
    return product.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Head>
        <title>Menu da Cafeteria</title>
      </Head>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4">
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
    </div>
  );
}

// 👇 AQUI ACONTECE A BUSCA NO BANCO DE DADOS
export async function getStaticProps() {
  const query = `*[_type == "product"]{
    "id": _id,
    name,
    description,
    price,
    "imageUrl": image.asset->url, 
    tags,
    available,
    category
  }`;

  const products = await client.fetch(query);

  return {
    props: {
      products,
    },
    revalidate: 60, // Atualiza o site a cada 60s se houver mudança no preço
  };
}