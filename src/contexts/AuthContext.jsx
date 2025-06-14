import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false); // جدید

  useEffect(() => {
    const loggedIn = localStorage.getItem("userLoggedIn") === "true";
    const user = localStorage.getItem("currentUser");
    // console.log("AuthContext loaded:", { loggedIn, user });

    if (loggedIn && user) {
      try {
        const parsedUser = JSON.parse(user);
        setIsLoggedIn(true);
        setCurrentUser(parsedUser);
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
      }
    }
    setIsAuthLoaded(true);
  }, []);

  const login = (user) => {
    console.log("Login called:", { user });
    setIsLoggedIn(true);
    setCurrentUser(user);
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
    console.log("Login complete:", { isLoggedIn: true, currentUser: user });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("currentUser");

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
