import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";
import authRoutes from "./routes/user.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
