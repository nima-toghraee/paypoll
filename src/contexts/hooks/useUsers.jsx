import { useState, useEffect } from "react";
import {
  checkUsername,
  createUser,
  getUserByCredentials,
  getUsers,
} from "../../Api/Api";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);

  // ...........................................
  // Load all users on component mount
  // ...........................................
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (process.env.NODE_ENV === "development") {
          console.log("کاربران لود شدند:", response.data.length, "آیتم");
        }
        setUsers(response.data);
      } catch (err) {
        console.error("خطا در لود کاربران:", err);
      } finally {
        setIsUsersLoaded(true);
      }
    };
    fetchUsers();
  }, []);

  // ...........................................
  // Check user credentials and return matching user
  // ...........................................
  const checkUser = async (username, password) => {
    try {
      const response = await getUserByCredentials(username, password);
      if (response.data.length === 0) {
        throw new Error("نام کاربری یا رمز عبور اشتباه است");
      }
      return response.data[0];
    } catch (err) {
      console.error("خطا در چک کاربر:", err);
      throw err;
    }
  };

  // ...........................................
  // Check admin credentials and return matching admin
  // ...........................................
  const checkAdmin = async (username, password) => {
    try {
      const response = await getAdminByCredentials(username, password);

      if (response.data.length === 0) {
        throw new Error("نام کاربری یا رمز عبور اشتباه است");
      }
      return response.data[0];
    } catch (err) {
      console.error("خطا در چک ادمین:", err);
      throw err;
    }
  };

  // ...........................................
  // Add a new user with unique username and generated ID
  // ...........................................
  const addUser = async (newUser) => {
    try {
      // Check if username already exists
      const usernameCheck = await checkUsername(newUser.username);
      if (usernameCheck.data.length > 0) {
        throw new Error("این نام کاربری قبلاً ثبت شده است");
      }

      // Generate new user ID
      const usersResponse = await getUsers();
      const users = usersResponse.data;
      console.log("users:", users);

      const maxId =
        users.length > 0
          ? Math.max(...users.map((user) => parseInt(user.id, 10)))
          : 999;
      const newId = (maxId + 1).toString();
      const userWithId = { ...newUser, id: newId };

      // ..............
      // added user to server
      // ....................
      const response = await createUser(userWithId);
      if (process.env.NODE_ENV === "development") {
        console.log("کاربر اضافه شد:", response.data.username);
      }
      setUsers([...users, response.data]);
    } catch (err) {
      console.error("خطا در افزودن کاربر:", err);
      throw err;
    }
  };

  return { users, isUsersLoaded, addUser, checkUser, checkAdmin };
};
