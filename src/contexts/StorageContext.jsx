import { createContext } from "react";
import { useUsers } from "./useUsers";
import { usePurchases } from "./usePurchases";
import { useAdminOrders } from "./useAdminOrders";

export const StorageContext = createContext();

export const StorageProvider = ({ children }) => {
  const userLogic = useUsers();
  const purchaseLogic = usePurchases();
  const ordersLogic = useAdminOrders();

  const isStorageLoaded =
    userLogic.isUsersLoaded && purchaseLogic.isPurchasesLoaded;

  return (
    <StorageContext.Provider
      value={{
        ...userLogic,
        ...purchaseLogic,
        ...ordersLogic,
        isStorageLoaded,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
