import { createContext } from "react";
import { useUsers } from "./useUsers";
import { useAdminOrders } from "./useAdminOrders";
import { ProductsProvider, useProducts } from "./UseProducts";
import { CartProvider, useCart } from "./CartContext"; // اصلاح تایپوگرافی

export const StorageContext = createContext();

export const StorageProvider = ({ children }) => {
  return (
    <ProductsProvider>
      <CartProvider>
        <StorageContextInner>{children}</StorageContextInner>
      </CartProvider>
    </ProductsProvider>
  );
};

const StorageContextInner = ({ children }) => {
  const userLogic = useUsers();
  const ordersLogic = useAdminOrders();
  const productLogic = useProducts();
  const cartLogic = useCart();

  const isStorageLoaded =
    userLogic.isUsersLoaded && productLogic.loading === false;

  return (
    <StorageContext.Provider
      value={{
        ...userLogic,
        ...ordersLogic,
        ...productLogic,
        ...cartLogic,
        isStorageLoaded,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
