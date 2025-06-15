import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./Pages/User/User";
import UserInfo from "./Pages/User/UserProfile/UserProfile";
import Payment from "./Pages/User/Payment";
import Admin from "./Pages/Admin/Admin";
import AdminLogin from "./Pages/Admin/AdminLogin";
import UserSignup from "./Pages/User/UserSignup";
import UserLogin from "./Pages/User/UserLogin";
import Cart from "./Pages/Cart/Cart";
import Dashboard from "./Pages/User/Dashboard/Dashboard";
import ListUsers from "./Pages/Admin/AdminSidebar/ListUsers";
import AdminChat from "./Pages/Admin/AdminHeader/AdminChat";
import { AuthProvider } from "./contexts/AuthContext";
import { StorageProvider } from "./contexts/StorageContext";
import UserProfile from "./Pages/User/UserProfile/UserProfile";
import Home from "./Pages/Home/Home";
import CategoryPage from "./Pages/Home/Content/CategoryPage";

export default function App() {
  return (
    <AuthProvider>
      <StorageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
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
            <Route path="/category/:category" element={<CategoryPage />} />
          </Routes>
        </BrowserRouter>
      </StorageProvider>
    </AuthProvider>
  );
}
