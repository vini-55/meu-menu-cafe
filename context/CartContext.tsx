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

  // 1. Carregamento Seguro (Protege contra dados antigos/corrompidos)
  useEffect(() => {
    const storedCart = localStorage.getItem('@CafeLuna:cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      } catch (error) {
        console.error("Erro ao ler carrinho, limpando...", error);
        localStorage.removeItem('@CafeLuna:cart');
      }
    }
  }, []);

  // 2. Salvamento Automático
  useEffect(() => {
    localStorage.setItem('@CafeLuna:cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const itemExists = currentCart.find((item) => item.id === product.id);
      if (itemExists) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });
  };

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
    localStorage.removeItem('@CafeLuna:cart');
  };

  // 3. Cálculo Blindado (Evita o NaN se o preço vier errado)
  const total = cart.reduce((sum, item) => {
    const itemTotal = (Number(item.price) || 0) * (Number(item.quantity) || 0);
    return sum + (isNaN(itemTotal) ? 0 : itemTotal);
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart, total, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);