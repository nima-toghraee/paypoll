import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("userLoggedIn") === "true";
    const user = sessionStorage.getItem("currentUser");
    console.log("AuthContext loaded:", { loggedIn, user }); // دیباگ
    setIsLoggedIn(loggedIn);
    setCurrentUser(user);
  }, []);

  const login = (username) => {
    console.log("Login called:", { username }); // دیباگ
    setIsLoggedIn(true);
    setCurrentUser(username);
    sessionStorage.setItem("userLoggedIn", "true");
    sessionStorage.setItem("currentUser", username);
    console.log("Login complete:", { isLoggedIn: true, currentUser: username }); // دیباگ
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
