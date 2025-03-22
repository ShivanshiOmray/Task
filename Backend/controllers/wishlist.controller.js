import User from "../models/user.model.js";

export const addToWishlist = async (req, res) => {
  try {
    const { item } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.wishlist.includes(item))
      return res.status(400).json({ message: "Item already in wishlist" });

    user.wishlist.push(item);
    await user.save();

    res.json({ message: "Item added to wishlist", wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { item } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.wishlist = user.wishlist.filter((i) => i !== item);
    await user.save();

    res.json({
      message: "Item removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
