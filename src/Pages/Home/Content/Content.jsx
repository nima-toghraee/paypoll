import { useContext } from "react";
import { SearchProvider } from "../../../contexts/SearchContext";
import SearchItems from "./SearchItems";
import ShowProducts from "./ShowProducts";
import { StorageContext } from "../../../contexts/StorageContext";

export default function Content() {
  const { products, loading, error } = useContext(StorageContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64" dir="rtl">
        <p className="text-lg text-gray-600">در حال بارگذاری...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64" dir="rtl">
        <p className="text-lg text-red-600">خطا: {error}</p>
      </div>
    );
  }

  return (
    <SearchProvider products={products}>
      <div className="p-4" dir="rtl">
        <div>
          <SearchItems />
        </div>
        <div>
          <ShowProducts />
        </div>
      </div>
    </SearchProvider>
  );
}
