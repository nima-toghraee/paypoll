import { createContext } from "react";
import { useUsers } from "./useUsers";
import { usePurchases } from "./usePurchases";

export const StorageContext = createContext();

export const StorageProvider = ({ children }) => {
  const userLogic = useUsers();
  const purchaseLogic = usePurchases();

  const isStorageLoaded =
    userLogic.isUsersLoaded && purchaseLogic.isPurchasesLoaded;

  return (
    <StorageContext.Provider
      value={{
        ...userLogic,
        ...purchaseLogic,
        isStorageLoaded,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
