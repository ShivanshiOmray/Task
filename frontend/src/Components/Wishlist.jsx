import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Wishlist = () => {
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(AuthContext);
  const [item, setItem] = useState("");

  const handleAdd = () => {
    if (item.trim() !== "") {
      addToWishlist(item);
      setItem("");
    }
  };

  return (
    <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Your Wishlist 📝
      </h2>

      {/* Wishlist Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Enter item name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {/* Wishlist Items */}
      {wishlist.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {wishlist.map((w, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white p-3 rounded-lg shadow"
            >
              <span className="text-gray-700">{w}</span>
              <button
                onClick={() => removeFromWishlist(w)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center mt-3">
          Your wishlist is empty!
        </p>
      )}
    </div>
  );
};

export default Wishlist;
