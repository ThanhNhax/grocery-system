import express from "express";
import productRoutes from "./src/routes/product.route.js";
import pool from "./src/db/pool.js";
import { errorHandler } from "./src/middleware/error.middleware.js";

const app = express();
// middleware
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

//middleware
const auth = (req, res, next) => {
    console.log("check auth");
    next();
};

app.use("/products", productRoutes);

app.use(errorHandler);

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
