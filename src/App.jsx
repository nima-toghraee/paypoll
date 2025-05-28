import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductCode from "./Pages/User/ProductCode";
import User from "./Pages/User/User";
import UserInfo from "./Pages/User/UserInfo";
import Payment from "./Pages/User/Payment";
import AdminLogin from "./Pages/Admin/AdminLogin";
import Admin from "./Pages/Admin/Admin";
import AdminSignup from "./Pages/Admin/AdminSignup";
import UserSignup from "./Pages/User/UserSignup";
import UserLogin from "./Pages/User/UserLogin";
import Cart from "./Pages/User/cart";
import Dashboard from "./Pages/User/Dashboard/Dashboard";
import ListUsers from "./Pages/Admin/AdminSidebar/ListUsers";
import AdminChat from "./Pages/Admin/AdminHeader/AdminChat";

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
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/user-Login" element={<UserLogin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/users" element={<ListUsers />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/chat/:username" element={<AdminChat />} />
      </Routes>
    </BrowserRouter>
  );
}
