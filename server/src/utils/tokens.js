import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function signAccess(payload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.ACCESS_TOKEN_TTL,
  });
}

export function signRefresh(payload) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.REFRESH_TOKEN_TTL,
  });
}

export function verifyRefresh(token) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
}
