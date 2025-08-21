import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ message: "Missing token" });
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
    req.user = {
      _id: decoded._id,
      username: decoded.username,
      role: decoded.role,
    };
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
}
