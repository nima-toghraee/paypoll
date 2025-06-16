import { useParams } from "react-router-dom";
import { useSearch } from "../../../contexts/SearchContext";
import { StorageContext } from "../../../contexts/StorageContext";
import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import { AuthContext } from "../../../contexts/AuthContext";

export default function ProductPage() {
  const { id } = useParams();
  const { filteredProducts } = useSearch();
  const { currentUser } = useContext(AuthContext);
  const { addToCart, comments, addComment, fetchCommentsByProduct } =
    useContext(StorageContext);

  const [newComment, setNewComment] = useState("");
  const product = filteredProducts.find((p) => p.id.toString() === id);

  useEffect(() => {
    if (product) {
      fetchCommentsByProduct(product.id);
    }
  }, [product?.id]);

  if (!product) {
    return <p className="text-center mt-10 text-red-600">محصول پیدا نشد</p>;
  }

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;
    if (!currentUser) return alert("برای ثبت نظر باید وارد شوید.");

    const commentData = {
      productId: product.id,
      userId: currentUser.id,
      username: currentUser.username,
      text: newComment,
      date: new Date().toISOString(),
    };
    console.log("📦 ارسال کامنت:", commentData);

    await addComment(commentData);

    setNewComment(""); // پاک کردن بعد از ارسال
  };

  return (
    <div dir="rtl">
      <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md shadow-md border-b border-gray-200">
        <Header />
      </header>

      <div className="flex flex-col w-7/12 mx-auto sm:flex-row gap-6 bg-white rounded-xl shadow-md p-6 mt-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full sm:w-1/2 h-64 object-contain"
        />
        <div className="w-full sm:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {product.title}
          </h1>
          <p className="text-sm text-gray-600 mb-4">{product.category}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-bold text-blue-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            افزودن به سبد
          </button>
        </div>
      </div>

      {/* نمایش کامنت‌ها */}
      <div className="w-7/12 mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
        <h2 className="text-xl font-bold text-teal-600 mb-4">نظرات کاربران</h2>
        {Array.isArray(comments) && comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((c) =>
              c && c.username && c.text ? (
                <li key={c.id} className="border-b pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-800">
                      {c.username}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(c.date).toLocaleDateString("fa-IR")}
                    </span>
                  </div>
                  <p className="text-gray-700">{c.text}</p>
                </li>
              ) : null
            )}
          </ul>
        ) : (
          <p className="text-gray-500">هنوز نظری ثبت نشده است.</p>
        )}

        {/* فرم ثبت نظر */}
        <form onSubmit={handleAddComment} className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="نظر خود را اینجا بنویسید..."
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows="3"
          />
          <button
            type="submit"
            className="w-full mt-2 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            ارسال نظر
          </button>
        </form>
      </div>
    </div>
  );
}
