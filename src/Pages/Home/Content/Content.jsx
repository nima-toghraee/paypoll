import { useContext } from "react";
import { SearchProvider } from "../../../contexts/SearchContext";
import SearchItems from "./SearchItems";
import ShowProducts from "./ShowProducts";
import { StorageContext } from "../../../contexts/StorageContext";
import FilterItems from "./FiltereItems";

export default function Content() {
  const { loading, error } = useContext(StorageContext);

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
    <div className="p-4" dir="rtl">
      <div>
        <FilterItems />
      </div>
      <div>
        <ShowProducts />
      </div>
    </div>
  );
}
