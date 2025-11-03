import { useCart, type CartItem } from "../pages/Product/CartContext";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../pages/Product/OrderContext";
import type { Order } from "../pages/Product/OrderContext";

export const useCheckout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, getPriceTotal } = useCart();
  const { addOrder } = useOrder();

  const checkout = () => {
    if (cartItems.length === 0) return;

    const newOrder: Order = {
      id: 1,
      date: new Date().toLocaleString(),
      itemList: cartItems,
      totalPrice: getPriceTotal(),
    };

    addOrder(newOrder);

    clearCart();

    navigate(`/user`);
  };

  return checkout;
};
