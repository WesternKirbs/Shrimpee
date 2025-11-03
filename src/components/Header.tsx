import { useNavigate } from "react-router-dom";
import Logo from "./icons/Logo";
import CartIcon from "./icons/CartIcon";
import UserIcon from "./icons/User";
import { useCart } from "../pages/Product/CartContext";

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  return (
    <header className=" bg-orange-400">
      <div className="max-w-screen-xl mx-auto flex justify-between px-6 py-3">
        <button className="flex gap-3 text-4xl" onClick={() => navigate(`/`)}>
          <Logo></Logo>
          Shrimpee
        </button>
        <div className="flex gap-5">
          <button className="" onClick={() => navigate(`/user`)}>
            <UserIcon></UserIcon>
          </button>
          <button
            className="flex items-center"
            onClick={() => navigate(`/cart`)}
          >
            <div className="relative">
              <CartIcon></CartIcon>
              {cartItems.length > 0 && (
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full leading-none px-1 py-.5 z-0">
                  <span className="text-xs font-bold text-white">
                    {cartItems.length}
                  </span>
                </div>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
