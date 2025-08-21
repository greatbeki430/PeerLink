import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { signAccess, signRefresh } from "../utils/tokens.js";

/**
 * Register user → create user + sign JWT
 */
export async function register(req, res) {
  const { email, username, password, role } = req.body;
  if (!email || !username || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "User already exists" });

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      username,
      password: hash,
      role,
    });

    // Sign tokens
    const accessToken = signAccess({
      _id: user._id,
      username: user.username,
      role: user.role,
    });
    const refreshToken = signRefresh({ _id: user._id });

    res.json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to register user" });
  }
}

/**
 * Optional: Get current logged-in user info
 */
export async function me(req, res) {
  try {
    const user = await User.findById(req.user._id).select(
      "username email role"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
