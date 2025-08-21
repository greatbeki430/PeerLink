import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import friendRoutes from "./routes/friend.routes.js";
import { errorHandler } from "./middleware/error.js";

const app = express();

// Middlewares
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/friends", friendRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
