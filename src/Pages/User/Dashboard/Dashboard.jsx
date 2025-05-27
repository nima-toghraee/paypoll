import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Sidebar } from "./Sidebar";

export default function Dashboard() {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("userLoggedIn") === "true";

  if (!isLoggedIn) {
    navigate("/user-login");
  }

  return (
    <div>
      <div>
        <Header />
      </div>

      <div>
        <Sidebar />
      </div>
    </div>
  );
}
