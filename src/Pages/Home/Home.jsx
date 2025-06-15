import Content from "./Content/Content";
import Header from "./Header/Header";

export default function Home() {
  return (
    <div
      className="w-full grid grid-rows-[auto_1fr_auto] min-h-screen text-gray-800"
      dir="rtl"
    >
      <header className="sticky top-0 z-50 w-full px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 shadow-md border-b border-gray-200">
        {" "}
        <Header />
      </header>

      <section
        className="w-[80%] sm:w-[90%] mx-auto flex flex-col sm:flex-row gap-6 my-8 "
        dir="rtl"
      >
        <aside className="w-full sm:w-[20%] bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <sideBar />
        </aside>

        <main className="w-full sm:w-[80%] bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          {" "}
          <Content />
        </main>
      </section>

      <footer className="w-full bg-gray-100 py-6">
        <footer />
      </footer>
    </div>
  );
}
