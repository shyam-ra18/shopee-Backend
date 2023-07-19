const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/product/productRoutes");
const categoryRoutes = require("./routes/product/categories");
const brandsRoutes = require("./routes/product/brands");
const server = express();
const port = 8080;

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json());

main().catch((error) => console.log(error));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/shopee");
  console.log("database connected");
}

server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.use("/products", productRoutes.router);
server.use("/categories", categoryRoutes.router);
server.use("/brands", brandsRoutes.router);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
