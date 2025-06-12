import { FaSearch } from "react-icons/fa";
import { useSearch } from "../../../contexts/SearchContext";

export default function SearchItems() {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div
      className="relative flex justify-center w-full sm:w-3/4 md:w-1/2 mx-auto mb-6"
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
    </div>
  );
}
