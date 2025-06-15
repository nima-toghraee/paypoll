import { FaFilter, FaSearch } from "react-icons/fa";
import { useSearch } from "../../../contexts/SearchContext";
import { useEffect, useState } from "react";

export default function SearchItems() {
  const { searchTerm, setSearchTerm, sortOption, setSortOption } = useSearch();
  const [isOpen, setIsOpen] = useState(false);

  const handleSort = (option) => {
    console.log("گزینه انتخاب‌شده:", option);
    setSortOption(option);
    console.log("sortOption جدید:", sortOption);
    setIsOpen(false);
  };

  useEffect(() => {
    console.log("sortOption به‌روز شد:", sortOption);
  }, [sortOption]);

  return (
    <div
      className="relative flex justify-center w-full sm:w-3/4  mx-auto mb-6 gap-8"
      dir="rtl"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-3 pr-12 w-full rounded-2xl text-right focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition-all duration-200"
        placeholder="جستجوی محصول یا دسته‌بندی..."
      />
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
        title="جستجو"
      >
        <FaSearch className="w-5 h-5 hover:scale-125 transition-transform duration-200" />
      </button>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-2 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition-colors"
      >
        <FaFilter className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute top-full right-3 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-20">
          <ul className="py-1">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSort("priceAsc")}
            >
              قیمت از کمتر به بیشتر
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSort("priceDesc")}
            >
              قیمت از بیشتر به کمتر
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSort("rating")}
            >
              بیشترین امتیاز
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSort("popular")}
            >
              پرفروش‌ترین محصولات
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
