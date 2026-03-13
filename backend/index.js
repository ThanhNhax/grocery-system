import express from "express";
import productRoutes from './src/routes/product.route.js'
import pool from './src/db/pool.js'
const app = express();
// middleware
app.use(express.json());

// routing
app.get("/", (req, res) => {
    res.send("hello form thanh nhax server!");
});

const products = [{ id: 0, name: "coca cola", price: 12, stock: 50 }];

//middleware
const auth = (req, res, next) => {
    console.log("check auth");
    next()
};

app.use(('/products'),productRoutes)
// app.get("/products", auth, (req, res) => {
//     return res.status(200).json({
//         data: products,
//     });
// });

// app.post("/products", (req, res) => {
//     const { name, price, stock } = req.body;
//     if (!name) {
//         throw new Error("Tên sản phẩm phải có!");
//     }
//     if (!price) {
//         throw new Error("price phải có!");
//     }
//     if (!stock) {
//         throw new Error("stock phải có!");
//     }
//     products.push({
//         name,
//         price,
//         stock,
//         id: (products[products.length - 1]?.id || 0) + 1,
//     });
//     return res.status(200).json({
//         data: products,
//     });
// });

app.use(express.json());

const startServer = async () => {
  try {
    const result = await pool.query("SELECT * FROM products");
    console.log("DB connected:", result.rows);

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();

const port = 8000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
