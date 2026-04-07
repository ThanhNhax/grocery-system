import express from "express";
import productRoutes from "./routes/product.route.js";
import categoriesRoutes from "./routes/categories.route.js";
import inventoryRoutes from "./routes/inventory.route.js";


import pool from "./db/pool.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/health", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      success: true,
      message: "Server is healthy",
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

app.use("/products", productRoutes);
app.use("/categories", categoriesRoutes);
app.use("/inventory", inventoryRoutes);

app.use(errorHandler);

export default app;