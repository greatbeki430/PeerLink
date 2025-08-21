import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  incoming,
  respond,
  sendRequest,
} from "../controllers/friend.controller.js";

const r = Router();
r.post("/send/:userId", requireAuth, sendRequest);
r.get("/incoming", requireAuth, incoming);
r.put("/respond/:requestId", requireAuth, respond);
export default r;
