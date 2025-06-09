import { useState, useEffect } from "react";

export function useAdminOrders(searchTerm = "") {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // لود orders
        const ordersRes = await fetch("http://localhost:3002/orders");
        if (!ordersRes.ok) throw new Error("خطا در لود سفارش‌ها");
        const ordersData = await ordersRes.json();
        if (process.env.NODE_ENV === "development") {
          console.log("سفارش‌ها لود شدند:", ordersData.length, "آیتم");
        }
        setOrders(ordersData);

        // لود users
        const usersRes = await fetch("http://localhost:3002/users");
        if (!usersRes.ok) throw new Error("خطا در لود کاربران");
        const usersData = await usersRes.json();
        setUsers(usersData);
      } catch (err) {
        setError("خطا در بارگذاری داده‌ها");
        console.error("خطا:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // فیلتر سفارش‌ها بر اساس trackingCode
  const filteredOrders = orders.filter(
    (order) =>
      order.trackingCode &&
      order.trackingCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ساخت لیست کاربران با سفارش‌ها
  const userList = users
    .map((user) => ({
      ...user,
      orders: filteredOrders.filter((order) => order.userId === user.username),
    }))
    .filter((user) => user.orders.length > 0);

  return { userList, loading, error };
}
