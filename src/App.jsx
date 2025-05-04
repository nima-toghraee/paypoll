import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductCode from "./Pages/ProductCode";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductCode />} />
      </Routes>
    </BrowserRouter>
  );
}
