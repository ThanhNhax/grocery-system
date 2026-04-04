import app from "./src/app.js";
import pool from "./src/db/pool.js";

const startServer = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("DB connected successfully");

    app.listen(8000, () => {
      console.log("Server running on port 8000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();