import app from "./App.js";
import { env } from "./config/env.js";
import connectDB from "./db/connect.js";

const PORT = env.PORT || 5000;

async function startServer() {
  try {
    await connectDB(env.MONGO_URI); 
    // console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to database", err);
    process.exit(1); // exit if DB connection fails
  }
}

startServer();
