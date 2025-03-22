import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <div className="bg-white p-8 shadow-lg rounded-2xl text-center w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome to MERN Auth System 🚀
        </h1>
        <p className="text-gray-600 mb-6">Sign up or log in to get started.</p>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link
            to="/register"
            className="w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-center"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="w-1/2 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition text-center"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
