import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false); // جدید

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("userLoggedIn") === "true";
    const user = sessionStorage.getItem("currentUser");
    // console.log("AuthContext loaded:", { loggedIn, user });
    setIsLoggedIn(loggedIn);
    setCurrentUser(user);
    setIsAuthLoaded(true); // لود کامل شد
  }, []);

  const login = (username) => {
    console.log("Login called:", { username });
    setIsLoggedIn(true);
    setCurrentUser(username);
    sessionStorage.setItem("userLoggedIn", "true");
    sessionStorage.setItem("currentUser", username);
    console.log("Login complete:", { isLoggedIn: true, currentUser: username });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    sessionStorage.clear();
    console.log("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, currentUser, login, logout, isAuthLoaded }}
    >
      {children}
    </AuthContext.Provider>
  );
};
