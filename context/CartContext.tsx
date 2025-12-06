import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextData {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  total: number;
  cartCount: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Carregar carrinho salvo
  useEffect(() => {
    const storedCart = localStorage.getItem('@CafeLuna:cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch {
        localStorage.removeItem('@CafeLuna:cart');
      }
    }
  }, []);

  // Salvar carrinho automaticamente
  useEffect(() => {
    localStorage.setItem('@CafeLuna:cart', JSON.stringify(cart));
  }, [cart]);

  // FUNÇÃO DE ADICIONAR (Aumenta quantidade se já existe)
  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const itemExists = currentCart.find((item) => item.id === product.id);
      if (itemExists) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Garante que começa com 1 e limpa qualquer lixo de dados antigos
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });
  };

  // FUNÇÃO DE DIMINUIR (Remove se for 1, diminui se for maior)
  const decreaseQuantity = (productId: string) => {
    setCart((currentCart) => {
      const itemExists = currentCart.find((item) => item.id === productId);
      if (!itemExists) return currentCart;
      
      if (itemExists.quantity === 1) {
        return currentCart.filter((item) => item.id !== productId);
      } else {
        return currentCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart, total, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);