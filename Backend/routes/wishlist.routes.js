import express from "express";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../controllers/wishlist.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/add", authMiddleware, addToWishlist);
router.post("/remove", authMiddleware, removeFromWishlist);
router.get("/", authMiddleware, getWishlist);

export default router;
