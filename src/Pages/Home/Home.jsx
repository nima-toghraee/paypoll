import { useContext } from "react";
import { SearchProvider } from "../../contexts/SearchContext";
import Content from "./Content/Content";
import Header from "./Header/Header";
import { StorageContext } from "../../contexts/StorageContext";
import MenuConainer from "./Menu/MenuContainer";

export default function Home() {
  const { products } = useContext(StorageContext);

  return (
    <SearchProvider products={products}>
      <div className="w-full" dir="rtl">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md shadow-md border-b border-gray-200">
          <Header />
        </header>

        {/* Main Content Section */}
        <section className="w-full px-4 sm:px-8 lg:px-20 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar / Menu */}
            <aside className="w-full lg:w-1/4">
              <MenuConainer />
            </aside>

            {/* Main Product Content */}
            <main className="w-full lg:w-3/4">
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <Content />
              </div>
            </main>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-gray-100 py-6 mt-auto">
          <div className="text-center text-sm text-gray-500">
            © 2025 فروشگاه شما
          </div>
        </footer>
      </div>
    </SearchProvider>
  );
}
