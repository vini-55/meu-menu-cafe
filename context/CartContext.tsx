import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  quantity?: string; // Mantendo o campo de peso/porção que arrumamos antes
}

interface CartItem extends Product {
  quantityCount: number; // Mudei o nome interno para não confundir com o texto 'quantity'
}

interface CartContextData {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  total: number;
  cartCount: number;
  // NOVOS CAMPOS PARA A MESA/COMANDA
  identification: string; 
  setIdentification: (id: string) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [identification, setIdentification] = useState(""); // Começa vazio

  // 1. Carregar carrinho E a mesa salva (caso recarregue a página)
  useEffect(() => {
    const storedCart = localStorage.getItem('@CafeLuna:cart');
    const storedId = localStorage.getItem('@CafeLuna:id'); // Recupera a mesa
    
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch {
        localStorage.removeItem('@CafeLuna:cart');
      }
    }
    if (storedId) {
      setIdentification(storedId);
    }
  }, []);

  // 2. Salvar carrinho automaticamente
  useEffect(() => {
    localStorage.setItem('@CafeLuna:cart', JSON.stringify(cart));
  }, [cart]);

  // 3. Salvar a mesa automaticamente
  useEffect(() => {
    if (identification) {
      localStorage.setItem('@CafeLuna:id', identification);
    }
  }, [identification]);

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const itemExists = currentCart.find((item) => String(item.id) === String(product.id));
      if (itemExists) {
        return currentCart.map((item) =>
          String(item.id) === String(product.id) ? { ...item, quantityCount: item.quantityCount + 1 } : item
        );
      } else {
        return [...currentCart, { ...product, quantityCount: 1 }];
      }
    });
  };

  const decreaseQuantity = (productId: string) => {
    setCart((currentCart) => {
      const itemExists = currentCart.find((item) => String(item.id) === String(productId));
      if (!itemExists) return currentCart;
      
      if (itemExists.quantityCount === 1) {
        return currentCart.filter((item) => String(item.id) !== String(productId));
      } else {
        return currentCart.map((item) =>
          String(item.id) === String(productId) ? { ...item, quantityCount: item.quantityCount - 1 } : item
        );
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((currentCart) => currentCart.filter((item) => String(item.id) !== String(productId)));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('@CafeLuna:cart');
    // Nota: Não limpamos a mesa aqui propositalmente, 
    // para o cliente poder fazer um segundo pedido sem escanear de novo.
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantityCount, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantityCount, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      decreaseQuantity, 
      removeFromCart, 
      clearCart, 
      total, 
      cartCount,
      identification,     // Exportando
      setIdentification   // Exportando
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);