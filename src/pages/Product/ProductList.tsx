import { useContext, useRef, useEffect } from "react";
import { useProducts } from "./ProductContainer";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const observerTarget = useRef(null);
  // const [products, setProducts] = useState<Product[]>([]);
  const { products, isLoading, hasMore, fetchProducts } = useProducts();

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // If the target is intersecting (visible), and we aren't already loading
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          fetchProducts();
        }
      },
      {
        rootMargin: "0px 0px 500px 0px", 
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [isLoading, hasMore]);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="max-w-7xl bg-[#F5F5F5] mx-auto p-6">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <li
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-xl shadow-lg p-2 border border-transparent flex flex-col h-full  hover:shadow- transition duration-300 transform hover:border-[#FA4F30] hover:cursor-pointer hover:-translate-y-1 "
            >
              <img
                src={product.thumbnail}
                className="w-full aspect-square"
                alt=""
                loading="lazy"
              />
              <div className="py-4 flex flex-col flex-grow">
                <h3
                  className="text-md font-semibold text-gray-800 line-clamp-2"
                  title={product.title}
                >
                  {product.title}
                </h3>
              </div>
              <p className="text-[#EE4D2D] text-lg">${product.price}</p>
            </li>
          ))}
        </ul>
        {isLoading && <p className="">Loading more...</p>}
        {hasMore && !isLoading && <div ref={observerTarget} className="h-5" />}
        {!hasMore && <p className="text-center p-3">--You've seen it all!--</p>}
      </div>
    </div>
  );
};

export default ProductList;
