import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Wishlist from "./Wishlist";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome, {user?.name} 🎉
        </h2>

        <div className="bg-gray-100 p-4 rounded-lg text-left space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Course:</span> {user?.course}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Mobile:</span> {user?.mobile}
          </p>
        </div>

        {/* Wishlist Section */}
        <div className="mt-6">
          <Wishlist />
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
