import { createContext } from "react";
import { useUsers } from "./hooks/useUsers";
import { useAdminOrders } from "./hooks/useAdminOrders";
import { ProductsProvider, useProducts } from "./ProductsContext";
import { CartProvider, useCart } from "./CartContext"; // اصلاح تایپوگرافی
import { SearchProvider, useSearch } from "./SearchContext";
import CommentsProvider, { useComments } from "./CommentsContext";

export const StorageContext = createContext();

export const StorageProvider = ({ children }) => {
  return (
    <ProductsProvider>
      <CartProvider>
        <SearchProvider>
          <CommentsProvider>
            <StorageContextInner>{children}</StorageContextInner>
          </CommentsProvider>
        </SearchProvider>
      </CartProvider>
    </ProductsProvider>
  );
};

const StorageContextInner = ({ children }) => {
  const userLogic = useUsers();
  const ordersLogic = useAdminOrders();
  const productLogic = useProducts();
  const cartLogic = useCart();
  const searchLogic = useSearch();
  const commentlogic = useComments();

  const isStorageLoaded =
    userLogic.isUsersLoaded &&
    productLogic.loading === false &&
    !productLogic.error;

  if (productLogic.loading)
    return <p className="text-center">در حال بارگذاری...</p>;
  if (productLogic.error)
    return (
      <p className="text-center text-red-600">خطا: {productLogic.error}</p>
    );

  return (
    <StorageContext.Provider
      value={{
        ...userLogic,
        ...ordersLogic,
        ...productLogic,
        ...cartLogic,
        ...searchLogic,
        ...commentlogic,
        isStorageLoaded,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
