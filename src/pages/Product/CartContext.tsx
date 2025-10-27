import type { Product } from "./ProductContainer";
import { useContext, createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

interface CartContextType {
  cartItems: CartItem[];
  getPriceTotal: () => number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, newQ: number) => void;
  deleteItem: (productId: number) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

//  cartCount: number;
//removeFromCart: (productId: number) => void;
const STORAGE_KEY = "shopping_cart";
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const getInitialCart = (): CartItem[] => {
  const storedCart = localStorage.getItem(STORAGE_KEY);
  try {
    // If data exists, parse it; otherwise, return an empty array
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error);
    return [];
  }
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCart);

  const getPriceTotal = (): number =>
    cartItems.reduce(
      (total, item) => Math.round(item.price * item.quantity * 100) + total,
      0
    ) / 100;

  useEffect(() => {

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]); 

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {

      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {

        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: quantity,
          thumbnail: product.thumbnail,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const updateQuantity = (productId: number, newQ: number) => {
    const quantity = Math.max(1, newQ);

    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      );
    });
  };

  const deleteItem = (productId: number) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== productId);
    });
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        getPriceTotal,
        addToCart,
        updateQuantity,
        deleteItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
