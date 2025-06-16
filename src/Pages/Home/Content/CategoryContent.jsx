// CategoryContent.jsx
import Header from "../Header/Header";
import { useSearch } from "../../../contexts/SearchContext";
import SearchItems from "./SearchItems";
import { motion } from "framer-motion";
import FilterItems from "./FiltereItems";

export default function CategoryContent() {
  const { filteredProducts, loading, error } = useSearch();

  if (loading) {
    return <p className="text-center text-gray-600">در حال بارگذاری...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">خطا: {error}</p>;
  }

  return (
    <div
      className="w-full grid grid-rows-[auto_1fr_auto] min-h-screen text-gray-800"
      dir="rtl"
    >
      {/* Header */}
      <div className=" sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md shadow-md border-b border-gray-200">
        <Header />
      </div>

      {/* جستجو */}
      <div className="my-6">
        <FilterItems />
      </div>

      {/* عنوان دسته‌بندی */}
      <h1 className="text-2xl sm:text-3xl font-bold text-teal-600 mb-6 text-center">
        {filteredProducts[0]?.category || "محصولات"}
      </h1>

      {/* گرید محصولات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain p-4 transition-transform duration-300 hover:scale-105"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{product.category}</p>
              <p className="text-lg font-bold text-blue-600 mt-2">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
