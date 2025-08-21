import { Router } from "express";
import { register, me } from "../controllers/auth.controller.js"; // import the new simple register function
import { requireAuth } from "../middleware/auth.js";

const r = Router();

// Single registration route (no OTP/email)
r.post("/register", register);

// Optional: get logged-in user info
r.get("/me", requireAuth, me);

export default r;
