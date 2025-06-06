import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import UserHeader from "./UserHeader";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/user-login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <div>
        <UserHeader />
      </div>
    </div>
  );
}
