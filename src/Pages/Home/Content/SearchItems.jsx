import { FaFilter, FaSearch } from "react-icons/fa";
import { useSearch } from "../../../contexts/SearchContext";

export default function SearchItems() {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="relative w-full sm:w-3/4 mx-auto flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
      {/* جستجو */}
      <div className="relative w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pr-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 transition-all"
          placeholder="جستجوی محصول یا دسته‌بندی..."
        />
        <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-500 transition-colors" />
      </div>
    </div>
  );
}
