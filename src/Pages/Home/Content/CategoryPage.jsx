// CategoryPage.jsx
import { useParams } from "react-router-dom";
import CategoryContent from "./CategoryContent";
import { SearchProvider } from "../../../contexts/SearchContext";

export default function CategoryPage() {
  const { category } = useParams();

  return (
    <SearchProvider currentCategory={category}>
      <CategoryContent />
    </SearchProvider>
  );
}
