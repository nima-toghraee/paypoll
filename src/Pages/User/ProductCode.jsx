import { useState } from "react";
import products from "../../Products/Products";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header";
import { FaSearch } from "react-icons/fa";

export default function ProductCode() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    setError("");
    const found = products.find((p) => p.code === code.trim().toLowerCase());
    if (found) {
      navigate("/user", { state: { product: found } });
    } else {
      setError("کد محصول نامعتبر است");
    }
  };

  return (
    <div
      className="w-[80%]  sm:w-[90%] mx-auto  p-6 text-right max-w-7xl sm:p-4 font-sans"
      dir="rtl"
    >
      <Header />

      <div className="relative mb-2 flex m-auto w-2/4 mt-3">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border border-gray-300 p-3 pr-10 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="کد محصول را وارد کنید"
        />
        <button
          onClick={handleSubmit}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
          title="جستجو"
        >
          <FaSearch className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
