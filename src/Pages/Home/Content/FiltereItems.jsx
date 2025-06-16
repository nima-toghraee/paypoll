import { useEffect, useState } from "react";
import { useSearch } from "../../../contexts/SearchContext";
import { FaFilter } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterItems() {
  const [isOpen, setIsOpen] = useState(false);
  const { sortOption, setSortOption } = useSearch();

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
    <div className="relative">
      {/* دکمه فیلتر */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors mt-2 sm:mt-0"
      >
        <FaFilter />
        فیلتر
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 right-0 w-52 bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden"
          >
            {[
              { label: "قیمت از کمتر به بیشتر", value: "priceAsc" },
              { label: "قیمت از بیشتر به کمتر", value: "priceDesc" },
              { label: "بیشترین امتیاز", value: "rating" },
              { label: "پرفروش‌ترین", value: "popular" },
            ].map((item) => (
              <li
                key={item.value}
                onClick={() => handleSort(item.value)}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer transition-all"
              >
                {item.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
