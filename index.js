const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const productRoutes = require("./routes/product/productRoutes");
const categoryRoutes = require("./routes/product/categories");
const brandsRoutes = require("./routes/product/brands");
const userRoutes = require("./routes/user/userRoutes");
const authRoutes = require("./routes/auth/authRoutes");
const cartRoutes = require("./routes/cart/cartRoutes");
const orderRoutes = require("./routes/order/orderRoutes");
const { isAuth } = require("./middleware/authMiddleware");

const port = 8080;
server.use(cookieParser());

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json());

// backend routes
server.use("/products", productRoutes.router);
server.use("/categories", categoryRoutes.router);
server.use("/brands", brandsRoutes.router);
server.use("/user", userRoutes.router);
server.use("/auth", authRoutes.router);
server.use("/cart", cartRoutes.router);
server.use("/order", isAuth, orderRoutes.router);

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/shopee");
    console.log("Database connected");
    server.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

main().catch((error) => console.log("Error during server startup:", error));
