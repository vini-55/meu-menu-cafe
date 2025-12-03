import { createContext, useContext, useState, ReactNode } from 'react';

// Tipos
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number; // Quantidade deste item
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  totalPrice: number;
  totalItems: number;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Adicionar item (se já existe, aumenta a quantidade)
  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  // Remover item (diminui quantidade ou remove se for 0)
  const removeFromCart = (id: string) => {
    setCart((prev) => {
      return prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0);
    });
  };

  // Cálculos automáticos
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook para usar o carrinho em qualquer lugar
export const useCart = () => useContext(CartContext);