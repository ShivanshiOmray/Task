import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  course: { type: String, required: true },
  mobile: { type: String, required: true },
  wishlist: { type: [String], default: [] },
});

export default mongoose.model("User", userSchema);
