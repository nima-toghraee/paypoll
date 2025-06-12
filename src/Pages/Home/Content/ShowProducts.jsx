import { useContext } from "react";
import { useSearch } from "../../../contexts/SearchContext";
import { StorageContext } from "../../../contexts/StorageContext";

export default function ShowProducts() {
  const { filteredProducts } = useSearch();
  const { addToCart } = useContext(StorageContext);

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      dir="rtl"
    >
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600 col-span-full">
          محصولی یافت نشد
        </p>
      ) : (
        filteredProducts.map((product) => (
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
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                افزودن به سبد
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
