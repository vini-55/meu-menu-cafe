import { useState } from 'react';
import Head from 'next/head';
import MenuCard from '../components/MenuCard';
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';

// Dados Atualizados (Brownie, Co-Working e fotos corrigidas)
const products = [
  {
    id: '1',
    name: 'Cappuccino Avelã',
    description: 'Espresso duplo, leite vaporizado e essência de avelã.',
    price: 14.90,
    imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
    tags: ['Contém Lactose', 'Hot'],
    available: true,
    category: 'Cafés'
  },
  {
    id: '2',
    name: 'Toast de Avocado',
    description: 'Pão de fermentação natural com avocado, azeite e temperos.',
    price: 22.50,
    imageUrl: 'https://images.unsplash.com/photo-1603046891726-36bfd957e0bf?auto=format&fit=crop&w=600&q=80',
    tags: ['Vegano'],
    available: true,
    category: 'Salgados'
  },
  {
    id: '3',
    name: 'Croissant Simples',
    description: 'Clássico francês amanteigado.',
    price: 12.00,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    tags: ['Vegetariano'],
    available: false,
    category: 'Salgados'
  },
  {
    id: '4',
    name: 'Brownie de Chocolate',
    description: 'Brownie denso com pedaços de chocolate belga.',
    price: 10.00,
    imageUrl: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=600&q=80',
    tags: ['Sem Glúten'],
    available: true,
    category: 'Doces'
  },
  {
    id: '5',
    name: 'Estação Co-Working (1h)',
    description: 'Acesso à internet de alta velocidade e mesa compartilhada.',
    price: 35.00,
    imageUrl: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=600&q=80',
    tags: ['Wi-Fi 5G', 'Tomada'],
    available: true,
    category: 'Co-Working'
  }
];

export default function Home() {
  // Estado para guardar qual filtro está ativo
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Lógica de filtragem
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

        {/* Filtros */}
        <div className="flex justify-center w-full">
            <CategoryFilter 
              activeCategory={activeCategory} 
              onSelectCategory={setActiveCategory} 
            />
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredProducts.map((item) => (
            <MenuCard key={item.id} product={item} />
          ))}
          
          {/* Aviso se a categoria estiver vazia */}
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