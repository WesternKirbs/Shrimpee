import type { CartItem } from "./CartContext";
import { useContext, createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface Order {
  id: number;
  date: string;
  itemList: CartItem[];
  totalPrice: number;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
}
//   getPriceTotal: () => number;
//   calLifeSpending: () => number;

interface OrderProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "order_history";
const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within a OrderProvider");
  }
  return context;
};

const getInitialOrder = (): Order[] => {
  const storedOrder = localStorage.getItem(STORAGE_KEY);
  try {
    return storedOrder ? JSON.parse(storedOrder) : [];
  } catch (error) {
    console.error("Error parsing order from localStorage:", error);
    return [];
  }
};

const OrderProvider = ({ children }: OrderProviderProps) => {
  const [orders, setOrders] = useState<Order[]>(getInitialOrder);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders((prev) => {
      const newOrder: Order = {
        id: order.id,
        date: order.date,
        itemList: order.itemList,
        totalPrice: order.totalPrice,
      };
      return [...prev, newOrder];
    });
  };

  return <OrderContext value={{ orders, addOrder }}>{children}</OrderContext>;
};

export default OrderProvider;
