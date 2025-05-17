import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductCode from "./Pages/ProductCode";
import User from "./Pages/User";
import UserInfo from "./Pages/UserInfo";
import Payment from "./Pages/Payment";
import AdminLogin from "./Pages/AdminLogin";
import Admin from "./Pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductCode />} />
        <Route path="/user" element={<User />} />
        <Route path="/userForm" element={<UserInfo />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
