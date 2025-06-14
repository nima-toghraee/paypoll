import axios from "axios";

// Create an Axios instance with base URL and default headers
export const api = axios.create({
  baseURL: "http://localhost:3002",
  headers: { "Content-Type": "application/json" },
});

// Fetch all users
export const getUsers = () => api.get("/users");

// Fetch user by username and password
export const getUserByCredentials = (username, password) =>
  api.get(`/users?username=${username}&password=${password}`);

// Fetch admin by username and password
export const getAdminByCredentials = (username, password) =>
  api.get(`/admin?username=${username}&password=${password}`);

// Check if username exists
export const checkUsername = (username) =>
  api.get(`/users?username=${username}`);

// Create a new user
export const createUser = (user) => api.post("/users", user);

// ................................
// cart
// ................................

// Fetch cart items by user ID
export const getCartItems = (userId) => api.get(`/purchases?userId=${userId}`);

// Create a new cart item
export const createCartItem = (item) => api.post("/purchases", item);

// Update a cart item by ID
export const updateCartItem = (id, data) => api.patch(`/purchases/${id}`, data);

// Delete a cart item by ID
export const deleteCartItem = (id) => api.delete(`/purchases/${id}`);
