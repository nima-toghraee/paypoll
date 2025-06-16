import { useContext, useMemo } from "react";
import { useSearch } from "../../../contexts/SearchContext";
import { StorageContext } from "../../../contexts/StorageContext";
import { Link } from "react-router-dom";

export default function ShowProducts() {
  const { filteredProducts, loading, error, searchTerm } = useSearch();

  console.log("عبارت جستجو:", searchTerm);
  console.log("محصولات فیلترشده:", filteredProducts);

  const groupedProducts = useMemo(() => {
    const groups = {};
    filteredProducts.forEach((product) => {
      if (!groups[product.category]) {
        groups[product.category] = [];
      }
      groups[product.category].push(product);
    });
    return groups;
  }, [filteredProducts]);

  if (loading) {
    return (
      <p className="text-center text-gray-600 col-span-full">
        در حال بارگذاری...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 col-span-full">
        خطا در بارگذاری محصولات: {error}
      </p>
    );
  }

  return (
    <div className="" dir="rtl">
      {Object.keys(groupedProducts).length === 0 ? (
        <p className="text-center text-gray-600 col-span-full">
          محصولی یافت نشد
        </p>
      ) : (
        Object.keys(groupedProducts).map((category) => (
          <section key={category} className="mt-8 first:mt-0">
            <h2 className="text-lg font-bold text-teal-600 mb-4">
              <Link
                to={`/category/${category}`}
                className="hover:underline cursor-pointer"
              >
                {category}
              </Link>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedProducts[category].slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-contain p-4 transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      <Link
                        to={`/product/${product.id}`}
                        className="hover:underline"
                      >
                        {product.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {product.category}
                    </p>
                    <p className="text-lg font-bold text-blue-600 mt-2">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
