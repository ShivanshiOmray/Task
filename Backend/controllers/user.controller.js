import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// REGISTER USER
export const register = async (req, res) => {
  try {
    const { name, email, password, course, mobile } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      course,
      mobile,
    });
    await newUser.save();
    res.json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

// LOGIN USER
export const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login Successful", token, user });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// GET USER DETAILS
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};
