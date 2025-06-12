import Header from "../../components/Header";
import Content from "./Content/Content";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen gap-y-0">
      <header
        className="grid grid-cols-1 w-[80%]  sm:w-[90%] mx-auto  p-6 text-right max-w-7xl sm:p-4 font-sans"
        dir="rtl"
      >
        <Header />
      </header>

      <section
        className="w-[80%] sm:w-[90%] mx-auto flex flex-col sm:flex-row gap-4 my-6"
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
