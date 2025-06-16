import { createContext, useContext, useEffect, useState } from "react";
import { creatComment, getComment } from "../Api/Api";

const CommentsContext = createContext();

export default function CommentsProvider({ children }) {
  const [comments, setComments] = useState();

  const fetchCommentsByProduct = async (productId) => {
    try {
      const response = await getComment(productId);
      setComments(response.data);
    } catch (err) {
      console.error("خطا در لود کامنت ها:", err);
      throw err;
    }
  };

  const addComment = async (comment) => {
    try {
      const response = await creatComment(comment);

      console.log("✅ پاسخ سرور:", response.data);

      setComments((prev) => [...prev, response.data]);
    } catch (err) {
      console.error("خطا در افزودن کامنت:", err);
      throw err;
    }
  };

  return (
    <CommentsContext.Provider
      value={{ comments, addComment, fetchCommentsByProduct }}
    >
      {children}
    </CommentsContext.Provider>
  );
}
export function useComments() {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error("useComments must be used within a CommentsProvider");
  }
  return context;
}
