// components/Menu/CategoryMenu.jsx
import { Link } from "react-router-dom";
import { useProducts } from "../../../contexts/ProductsContext";

export default function CategoryMenu() {
  const { products } = useProducts();

  // استخراج دسته‌بندی‌ها بدون تکرار
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-lg font-bold mb-4 text-teal-600">دسته‌بندی‌ها</h2>

      <ul className="flex lg:flex-col md:flex-row sm:flex-col overflow-x-auto gap-3 text-right">
        {" "}
        {categories.map((category) => (
          <li key={category}>
            <Link
              to={`/category/${category}`}
              className="text-blue-600 hover:underline px-3 py-1 inline-block bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
