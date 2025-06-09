import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductCode from "./Pages/User/ProductCode";
import User from "./Pages/User/User";
import UserInfo from "./Pages/User/userProfile/UserProfile";
import Payment from "./Pages/User/Payment";
import Admin from "./Pages/Admin/Admin";
import AdminLogin from "./Pages/Admin/AdminLogin";
import UserSignup from "./Pages/User/UserSignup";
import UserLogin from "./Pages/User/UserLogin";
import Cart from "./Pages/User/cart";
import Dashboard from "./Pages/User/Dashboard/Dashboard";
import ListUsers from "./Pages/Admin/AdminSidebar/ListUsers";
import AdminChat from "./Pages/Admin/AdminHeader/AdminChat";
import { AuthProvider } from "./contexts/AuthContext";
import { StorageProvider } from "./contexts/StorageContext";
import UserProfile from "./Pages/User/userProfile/UserProfile";

export default function App() {
  return (
    <AuthProvider>
      <StorageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductCode />} />
            <Route path="/user" element={<User />} />
            <Route path="/userForm" element={<UserInfo />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/user-signup" element={<UserSignup />} />
            <Route path="/user-Login" element={<UserLogin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin/users" element={<ListUsers />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/chat/:username" element={<AdminChat />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </BrowserRouter>
      </StorageProvider>
    </AuthProvider>
  );
}
