import {
  useState,
  useContext,
  useRef,
  useEffect,
  createContext,
  useCallback,
} from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import CartProvider from "./CartContext";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  hasMore: boolean;
  fetchProducts: () => Promise<void>;
}

const limit = 30;
const totalProducts = 200;
const API_BASE_URL = "https://dummyjson.com";
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

const ProductContainer = () => {
  const [productResponse, setResonpse] = useState<ProductsResponse>();
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const didMountRef = useRef(false);
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`
      );
      const newTotalLoadedCount = skip + response.data.products.length;

      // setResonpse(response.data);
      setProducts((prev) => [...prev, ...response.data.products]);
      setSkip((prev) => prev + limit);
      if (newTotalLoadedCount >= totalProducts) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, skip]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      fetchProducts();
    }
  }, []);
  return (
    <ProductContext.Provider
      value={{ products, isLoading, hasMore, fetchProducts }}
    >
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
          <Header />
          <div className="flex-grow pb-10">
            <Outlet />
          </div>
        </div>
      </CartProvider>
    </ProductContext.Provider>
  );
};

export default ProductContainer;
