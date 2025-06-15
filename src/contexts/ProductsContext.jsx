import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        if (!response.data) {
          throw new Error("هیچ داده‌ای از API دریافت نشد");
        }
        const data = response.data;
        // console.log("Products from API:", data);
        const enhancedProducts = data.map((product) => ({
          ...product,
          sales: Math.floor(Math.random() * 100), // تعداد فروش تصادفی بین 0 تا 99
        }));
        setProducts(enhancedProducts);
      } catch (err) {
        setError(err.message || "خطا در ارتباط با سرور");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
