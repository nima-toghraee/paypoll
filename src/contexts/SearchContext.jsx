import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ products, children }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = (products || []).filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, filteredProducts }}
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
