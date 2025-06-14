import Content from "./Content/Content";
import Header from "./Header/Header";

export default function Home() {
  return (
    <div
      className="w-full grid grid-rows-[auto_1fr_auto] h-screen gap-y-0"
      dir="rtl"
    >
      <header className="sticky top-0 z-20 w-[80%] mx-auto p-6 text-right max-w-screen-2xl sm:w-[90%] sm:p-4 bg-white shadow-md font-sans">
        <Header />
      </header>

      <section
        className="w-[80%] sm:w-[90%] mx-auto flex flex-col sm:flex-row gap-4 my-6 "
        dir="rtl"
      >
        <aside className="w-full sm:w-[20%] bg-white p-4 rounded-xl shadow-md">
          <sideBar />
        </aside>

        <main className="w-full sm:w-[80%] bg-white p-4 rounded-xl shadow-md">
          <Content />
        </main>
      </section>

      <footer>
        <div className="border-4 border-green-700"></div>

        <footer />
      </footer>
    </div>
  );
}
