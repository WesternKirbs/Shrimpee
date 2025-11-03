import ProductContainer from "../pages/Product/ProductContainer.tsx";
import ProductDetail from "../pages/Product/ProductDetail.tsx";
import ProductList from "../pages/Product/ProductList.tsx";
import Cart from "../pages/Cart.tsx";
import About from "../pages/About.tsx";
import UserHist from "../pages/User.tsx";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductContainer />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/user",
        element: <UserHist/>,
      },
    ],
  },
  {
    path: "/about",
    element: <About />,
  },

  // You can add a 404 page here as well
  // {
  //   path: "*",
  //   element: <div>404 Not Found</div>,
  // },
]);
