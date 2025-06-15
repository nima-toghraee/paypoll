// CategoryContent.jsx
import Header from "../Pages/Home/Header/Header";
import { useSearch } from "./SearchContext";
import SearchItems from "../Pages/Home/Content/SearchItems";

export default function CategoryContent() {
  const { filteredProducts, loading, error } = useSearch();

  if (loading) {
    return <p className="text-center text-gray-600">در حال بارگذاری...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">خطا: {error}</p>;
  }

  return (
    <div className="p-4" dir="rtl">
      <header className="sticky top-0 z-50 w-full px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 shadow-md border-b border-gray-200">
        <Header />
      </header>

      <SearchItems />

      <h1 className="text-2xl font-bold text-teal-600 mb-4">
        {filteredProducts[0]?.category || "نامشخص"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain p-4"
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
          </div>
        ))}
      </div>
    </div>
  );
}
