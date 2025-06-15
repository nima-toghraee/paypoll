import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useProducts } from "./ProductsContext";

const SearchContext = createContext();

export function SearchProvider({ currentCategory, children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, loading, error } = useProducts();
  const [sortOption, setSortOption] = useState("");

  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) {
      console.log("products ناموجود یا آرایه نیست");
      return [];
    }

    let result = [...products];

    const searchWords = searchTerm
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 0); // کلمات خالی رو حذف می‌کنیم

    if (!searchTerm && currentCategory) {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() === currentCategory.toLowerCase()
      );
    } else if (searchWords.length > 0) {
      result = result.filter((product) =>
        searchWords.every(
          (word) =>
            product.title.toLowerCase().includes(word) ||
            product.description?.toLowerCase().includes(word)
        )
      );
    }

    switch (sortOption) {
      case "priceAsc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort(
          (a, b) => b.rating?.rate - a.rating?.rate || 0
        );
        break;
      case "popular":
        result = [...result].sort((a, b) => b.sales - a.sales || 0); // فرض بر وجود فیلد sales
        break;

      default:
        break;
    }

    console.log("محصولات مرتب‌شده:", result);
    return result;
  }, [products, searchTerm, sortOption, currentCategory]);
  console.log("filteredProducts:", filteredProducts);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        filteredProducts,
        loading,
        error,
        sortOption,
        setSortOption,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
