import { Router } from "express";
import { listGrouped } from "../controllers/users.controller.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();
r.get("/grouped", requireAuth, listGrouped);
export default r;
