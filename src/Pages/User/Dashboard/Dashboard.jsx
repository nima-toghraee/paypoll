import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Header from "../../Home/Header/Header";

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
      <div className="w-[80%]  sm:w-[90%] mx-auto  p-6 text-right max-w-7xl sm:p-4 font-sans">
        <Header />
      </div>
    </div>
  );
}
