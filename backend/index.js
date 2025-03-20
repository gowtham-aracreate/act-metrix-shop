const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/User", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};
connectDB();

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const UserDetail = mongoose.model("User", UserSchema);

// Product Schema
const ProductSchema = new mongoose.Schema({
  productName: String,
  productCategory: String,
  sellingPrice: Number,
  costPrice: Number,
  quantity: Number,
  discount: Boolean,
  discountValue: Number,
  expiryDate: String,
  returnPolicy: Boolean,
  shortDescription: String,
  longDescription: String,
  dateAdded: String,
  time: String,
  status: String,
});
const Product = mongoose.model("Product", ProductSchema);

// Customer Schema
const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  country: String,
  state: String,
  orders: Number,
  total: String,
  customerSince: String,
  status: String,
});
const Customer = mongoose.model("Customer", CustomerSchema);

// Order Schema (renamed to CustOrder)
const CustOrderSchema = new mongoose.Schema({
  orderDate: String,
  orderType: String,
  trackingID: String,
  orderTotal: String,
  action: String,
  status: String,
});
const CustOrder = mongoose.model("CustOrder", CustOrderSchema);

// User Registration
app.post("/create", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await UserDetail.create({ name, email, password: hashedPassword });
    res.json(data);
  } catch (error) {
    res.status(500).send("Error creating user");
  }
});

// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserDetail.findOne({ email });
    if (!user) return res.status(401).send("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Invalid email or password");

    res.send("Login successful");
  } catch (error) {
    res.status(500).send("Error logging in");
  }
});

// Fetch Customers
app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).send("Error fetching customers");
  }
});

// Add Customer
app.post("/customers", async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.json(newCustomer);
  } catch (error) {
    res.status(500).send("Error adding customer");
  }
});

// Fetch Orders
app.get("/custorders", async (req, res) => {
  try {
    const orders = await CustOrder.find();
    res.json(orders);
  } catch (error) {
    res.status(500).send("Error fetching orders");
  }
});

// Add Order
app.post("/custorders", async (req, res) => {
  try {
    const newOrder = new CustOrder(req.body);
    await newOrder.save();
    res.json(newOrder);
  } catch (error) {
    res.status(500).send("Error adding order");
  }
});

// Fetch Products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send("Error fetching products");
  }
});

// Add Product
app.post("/product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).send("Error adding product");
  }
});

// Update Product Status
app.patch("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.json(product);
  } catch (error) {
    res.status(500).send('Error fetching product');
  }
});

app.put('/product/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.json(product);
  } catch (error) {
    res.status(500).send('Error updating product');
  }
});

app.delete('/product/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send('Product deleted');
  } catch (error) {
    res.status(500).send('Error deleting product');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



