import { useCart } from "./Product/CartContext";
import QuantityCounter from "../components/QuantityCounter";
import Button from "../components/Button";
import { useCheckout } from "../hooks/useCheckout";
const Cart = () => {
  const { cartItems, getPriceTotal, updateQuantity, deleteItem, clearCart } =
    useCart();
  const checkout = useCheckout();
  if (cartItems) {
    return (
      <div className="min-h-screen bg-[#F5F5F5]">
        <div className="max-w-7xl bg-[#F5F5F5] mx-auto p-6">
          {cartItems.map((item) => (
            <div className="flex border-red-500 border">
              <img src={item.thumbnail} alt="" />
              <div className="grid grid-cols-5 flex-1 items-center">
                <span className="text-xl font-bold">{item.title}</span>
                <span>${item.price}</span>
                <div>
                  <QuantityCounter
                    initialQuantity={item.quantity}
                    min={1}
                    max={99}
                    onQuantityChange={(newQ) => updateQuantity(item.id, newQ)}
                  />
                </div>
                <span className="text-orange-600">
                  $
                  {(Math.round(item.price * item.quantity * 100) / 100).toFixed(
                    2
                  )}
                </span>
                <button>
                  <span
                    onClick={() => deleteItem(item.id)}
                    className="hover:text-orange-500"
                  >
                    Delete
                  </span>
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end gap-5 py-3">
            <span className="text-3xl text-orange-600 font-bold my-auto">
              Total: ${getPriceTotal().toFixed(2)}
            </span>
            <Button
              text="buy"
              txtColor="text-white"
              bgColor="bg-red-500 hover:bg-red-600"
              onClick={() => checkout()}
            ></Button>
          </div>
        </div>
      </div>
    );
  } else return <h1>nothing bought</h1>;
};

export default Cart;
