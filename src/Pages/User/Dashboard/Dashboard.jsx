import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import UserHeader from "./UserHeader";

export default function Dashboard() {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("userLoggedIn") === "true";

  if (!isLoggedIn) {
    navigate("/user-login");
  }

  return (
    <div>
      <div>
        <UserHeader />
      </div>
    </div>
  );
}
