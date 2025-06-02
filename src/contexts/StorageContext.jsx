import { createContext, useState, useEffect } from "react";

export const StorageContext = createContext();

export const StorageProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("user loaded", data);
        setUsers(data);
      })
      .catch((err) => console.error("خطا در لود کاربران", err));
  }, []);

  const checkUser = async (username, password) => {
    try {
      const res = await fetch(
        `http://localhost:3001/users?username=${username}&password=${password}`
      );
      const matchedUsers = await res.json();

      if (matchedUsers.length === 0) {
        throw new Error("نام کاربری یا رمز عبور اشتباه است");
      }
      return matchedUsers[0];
    } catch (err) {
      console.error("خطا در چک کاربر لطفا مجددا امتحان کنید", err);
      throw err;
    }
  };

  const addUser = async (newUser) => {
    try {
      const res = await fetch(
        `http://localhost:3001/users?username=${newUser.username}`
      );
      const existingUsers = await res.json();
      if (existingUsers.length > 0) {
        throw new Error("نام کاربر تکراری است");
      }

      const response = await fetch("http://localhost:3001/users", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const addedUser = await response.json();
      console.log("User added");
      setUsers([...users, addedUser]);
    } catch (err) {
      console.error("خطا در افزودن کاربر:", err);
      throw err;
    }
  };

  return (
    <StorageContext.Provider value={{ users, addUser, checkUser }}>
      {children}
    </StorageContext.Provider>
  );
};
