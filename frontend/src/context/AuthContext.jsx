import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const getUserFromStorage = () => {
    return (
      JSON.parse(sessionStorage.getItem("user")) ||
      JSON.parse(localStorage.getItem("user")) ||
      null
    );
  };

  const getTokenFromStorage = () => {
    return (
      sessionStorage.getItem("token") || localStorage.getItem("token") || null
    );
  };

  const getWishlistFromStorage = () => {
    return (
      JSON.parse(sessionStorage.getItem("wishlist")) ||
      JSON.parse(localStorage.getItem("wishlist")) ||
      []
    );
  };

  const [user, setUser] = useState(getUserFromStorage());
  const [token, setToken] = useState(getTokenFromStorage());
  const [wishlist, setWishlist] = useState(getWishlistFromStorage());

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
    } else {
      localStorage.clear();
      sessionStorage.clear();
    }
  }, [user, token, wishlist]);

  const logout = () => {
    setUser(null);
    setToken(null);
    setWishlist([]);
    localStorage.clear();
    sessionStorage.clear();

    navigate("/");
  };

  const addToWishlist = async (item) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/wishlist/add",
        { item },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlist(res.data.wishlist);
    } catch (error) {
      alert("Failed to add to wishlist");
    }
  };

  const removeFromWishlist = async (item) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/wishlist/remove",
        { item },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlist(res.data.wishlist);
    } catch (error) {
      alert("Failed to remove from wishlist");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        logout,
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
