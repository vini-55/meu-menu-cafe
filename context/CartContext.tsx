import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  quantity?: string;
}

interface CartItem extends Product {
  quantityCount: number;
}

interface CartContextData {
  cart: CartItem[];
  history: CartItem[];
  addToCart: (product: Product) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  confirmOrderToHistory: () => void;
  closeTab: () => void;
  totalCart: number;
  totalHistory: number;
  totalGrand: number;
  cartCount: number;
  identification: string;
  setIdentification: (id: string) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [history, setHistory] = useState<CartItem[]>([]);
  const [identification, setIdentification] = useState("");

  useEffect(() => {
    const now = new Date().getTime();
    const storedCart = localStorage.getItem('@CafeLuna:cart');
    const storedHistory = localStorage.getItem('@CafeLuna:history');
    const storedId = localStorage.getItem('@CafeLuna:id');
    const lastUpdate = localStorage.getItem('@CafeLuna:lastUpdate');

    if (lastUpdate && (now - Number(lastUpdate) > 12 * 60 * 60 * 1000)) {
      localStorage.removeItem('@CafeLuna:cart');
      localStorage.removeItem('@CafeLuna:history');
      setCart([]);
      setHistory([]);
    } else {
      if (storedCart) {
        try { setCart(JSON.parse(storedCart)); } catch { localStorage.removeItem('@CafeLuna:cart'); }
      }
      if (storedHistory) {
        try { setHistory(JSON.parse(storedHistory)); } catch { localStorage.removeItem('@CafeLuna:history'); }
      }
      if (storedId) setIdentification(storedId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('@CafeLuna:cart', JSON.stringify(cart));
    localStorage.setItem('@CafeLuna:history', JSON.stringify(history));
    localStorage.setItem('@CafeLuna:id', identification);
    localStorage.setItem('@CafeLuna:lastUpdate', String(new Date().getTime()));
  }, [cart, history, identification]);

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

  const confirmOrderToHistory = () => {
    setHistory((currentHistory) => {
      const newHistory = [...currentHistory];
      cart.forEach(cartItem => {
        const existingItem = newHistory.find(h => String(h.id) === String(cartItem.id));
        if (existingItem) {
          existingItem.quantityCount += cartItem.quantityCount;
        } else {
          newHistory.push(cartItem);
        }
      });
      return newHistory;
    });
    setCart([]);
  };

  const closeTab = () => {
    setCart([]);
    setHistory([]);
    localStorage.removeItem('@CafeLuna:cart');
    localStorage.removeItem('@CafeLuna:history');
  };

  const clearCart = () => setCart([]);

  // CÁLCULOS COM PROTEÇÃO CONTRA ERROS (Number + || 0)
  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const qtd = Number(item.quantityCount) || 0;
      return sum + (price * qtd);
    }, 0);
  };

  const totalCart = calculateTotal(cart);
  const totalHistory = calculateTotal(history);
  const totalGrand = totalCart + totalHistory;
  
  const cartCount = cart.reduce((sum, item) => sum + (Number(item.quantityCount) || 0), 0);

  return (
    <CartContext.Provider value={{ 
      cart, history, addToCart, decreaseQuantity, removeFromCart, clearCart, 
      confirmOrderToHistory, closeTab,
      totalCart, totalHistory, totalGrand, cartCount,
      identification, setIdentification
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);