import { FaTrash } from "react-icons/fa";

export default function CartItem({ item, onRemove, onDecrease, onIncrease }) {
  return (
    <div className=" debug">
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-contain"
      />
      <div className="flex-1 mr-4">
        <h3 className="text-lg font-semibold truncate">{item.title}</h3>
        <p className="text-sm text-gray-500">{item.category}</p>
        <p className="text-base font-bold text-blue-600">
          ${item.price.toFixed(2)} × {item.quantity}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onDecrease(item)}
            className="bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
          >
            -
          </button>
          <span className="text-lg">{item.quantity}</span>
          <button
            onClick={() => onIncrease(item)}
            className="bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
          >
            +
          </button>
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-600 hover:text-red-500"
            title="حذف آیتم"
          >
            <FaTrash className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
