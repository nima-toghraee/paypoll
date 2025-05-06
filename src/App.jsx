import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductCode from "./Pages/ProductCode";
import User from "./Pages/User";
import UserInfo from "./Pages/UserInfo";
import Payment from "./Pages/Payment";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductCode />} />
        <Route path="/user" element={<User />} />
        <Route path="/userForm" element={<UserInfo />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}
