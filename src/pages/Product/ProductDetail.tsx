import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useProducts } from "./ProductContainer";
import { useCart } from "./CartContext";
import axios from "axios";
import QuantityCounter from "../../components/QuantityCounter";
import Button from "../../components/Button";

const API_BASE_URL = "https://dummyjson.com";
const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { cartItems, addToCart } = useCart();
  const selectedProduct = products.find((p) => p.id === Number(id));
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [detailProduct, setDetailProduct] = useState(selectedProduct);
  const handleQuantityUpdate = (newQuantity: number) => {
    setSelectedQuantity(newQuantity);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!selectedProduct && !isDetailLoading) {
      console.log("in");
      const fetchDetail = async () => {
        setIsDetailLoading(true);
        try {
          const response = await axios.get(`${API_BASE_URL}/products/${id}`);
          setDetailProduct(response.data);
        } catch (error) {
          console.error("Failed to fetch product detail:", error);
        } finally {
          setIsDetailLoading(false);
        }
      };
      fetchDetail();
    }
  }, [id, selectedProduct]);

  const finalProduct = selectedProduct || detailProduct;
  if (isDetailLoading || !finalProduct) {
    return (
      <div className="min-h-screen bg-[#F5F5F5]">
        <div className="max-w-7xl bg-[#F5F5F5] mx-auto p-6 flex">
          <div>Loading product {id}...</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-[#F5F5F5]">
        <div className="max-w-7xl bg-[#F5F5F5] mx-auto p-6 grid grid-cols-7">
          <div className="col-span-2 col-start-2">
            <img className="" src={finalProduct?.images[0]} alt="" />
          </div>
          <div className="col-span-4 flex flex-col justify-between h-full p-8 mx-auto">
            <div className="">
              <h2 className="text-2xl mb-4">{finalProduct?.title}</h2>
              <h1 className="text-4xl font-bold text-red-500 mb-10">
                ${finalProduct?.price}
              </h1>
            </div>
            <div className="">
              <div className="mb-10">
                <QuantityCounter
                  initialQuantity={1}
                  min={1}
                  max={99}
                  onQuantityChange={handleQuantityUpdate}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  text="Buy Now"
                  txtColor="text-white"
                  bgColor="bg-red-500 hover:bg-red-600"
                  onClick={() => {
                    addToCart(finalProduct, selectedQuantity);
                    navigate(`/cart`);
                  }}
                ></Button>
                <Button
                  text="Add to cart"
                  txtColor="text-red-500"
                  bgColor="bg-red-200 hover:bg-red-100"
                  onClick={() => {
                    addToCart(finalProduct, selectedQuantity);
                    alert("Product added to cart!");
                  }}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductDetail;
