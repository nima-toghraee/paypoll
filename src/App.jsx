import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductCode from "./Pages/ProductCode";
import User from "./Pages/User";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductCode />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}
