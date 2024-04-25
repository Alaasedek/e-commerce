// index.js
const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// API endpoint to create a product
app.post("/products", async (req, res) => {
  const { name, price } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        price,
      },
    });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// API endpoint to list products
app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
