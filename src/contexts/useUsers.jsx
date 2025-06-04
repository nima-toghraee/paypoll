import { useState, useEffect } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3002/users")
      .then((res) => res.json())
      .then((data) => {
        if (process.env.NODE_ENV === "development") {
          console.log("کاربران لود شدند:", data.length, "آیتم");
        }
        setUsers(data);
      })
      .catch((err) => console.error("خطا در لود کاربران:", err))
      .finally(() => setIsUsersLoaded(true));
  }, []);

  const checkUser = async (username, password) => {
    try {
      const res = await fetch(
        `http://localhost:3002/users?username=${username}&password=${password}`
      );
      const matchedUsers = await res.json();
      if (matchedUsers.length === 0) {
        throw new Error("نام کاربری یا رمز عبور اشتباه است");
      }
      return matchedUsers[0];
    } catch (err) {
      console.error("خطا در چک کاربر:", err);
      throw err;
    }
  };

  const checkAdmin = async (username, password) => {
    try {
      const res = await fetch(
        `http://localhost:3002/admin?username=${username}&password=${password}`
      );
      const matchedAdmin = await res.json();
      if (matchedAdmin.length === 0) {
        throw new Error("نام کاربری یا رمز عبور اشتباه است");
      }
      return matchedAdmin[0];
    } catch (err) {
      console.error("خطا در چک ادمین:", err);
      throw err;
    }
  };

  const addUser = async (newUser) => {
    try {
      const res = await fetch(
        `http://localhost:3002/users?username=${newUser.username}`
      );
      const existingUsers = await res.json();
      if (existingUsers.length > 0) {
        throw new Error("این نام کاربری قبلاً ثبت شده است");
      }
      const response = await fetch("http://localhost:3002/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const addedUser = await response.json();
      if (process.env.NODE_ENV === "development") {
        console.log("کاربر اضافه شد:", addedUser.username);
      }
      setUsers([...users, addedUser]);
    } catch (err) {
      console.error("خطا در افزودن کاربر:", err);
      throw err;
    }
  };

  return { users, isUsersLoaded, addUser, checkUser, checkAdmin };
};
