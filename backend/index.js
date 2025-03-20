const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");
const nodemailer = require("nodemailer");


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
  resetOTP: String,
  otpExpires: Date,
});

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
const OrderSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  items: { type: Array, required: true },
  orderDate: { type: String, required: true },
  orderTime: { type: String, required: true },
  orderType: { type: String, required: true },
  paymentType: { type: String, required: true },
  trackingID: { type: String, required: true },
  shortDescription: { type: String, default: "" },
  status: { type: String, default: "Pending" },
  totalAmount: { type: Number, required: true },
});

const UserDetail = mongoose.model("User", UserSchema);
const Order = mongoose.model("Order", OrderSchema);
const Customer = mongoose.model("Customer", CustomerSchema);
const Product = mongoose.model("Product", ProductSchema);


const sendOTPEmail = async (email, otp) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail", // Or use SMTP settings
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Recovery OTP",
      text: `Your OTP code is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP Email Sent");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const otpGenerator = require("otp-generator");

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await UserDetail.findOne({ email });
  try {

    if (!user) {
      return res.status(404).json({ error: "Email not found. Please register first." });
    }
    const otp = crypto.randomInt(100000, 999999).toString();
    user.resetOTP = otp;

    user.otpExpires = Date.now() + 15 * 60 * 1000;

    await user.save();
    await sendOTPEmail(email, otp);

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP" });
  }
});

app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await UserDetail.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.resetOTP !== otp || Date.now() > new Date(user.otpExpires).getTime()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
    // user.resetOTP = null;
    // user.otpExpires = null;
    // await user.save();

    res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error during OTP verification" });
  }
});

app.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const user = await UserDetail.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.resetOTP !== otp || Date.now() > new Date(user.otpExpires).getTime()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOTP = null;
    user.otpExpires = null;

    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ error: "Server error while resetting password" });
  }
});

app.post("/resend-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserDetail.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins expiry

    user.resetOTP = newOTP;
    user.otpExpires = otpExpires;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your new OTP is: ${newOTP}. It will expire in 15 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "OTP resent successfully" });

  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({ error: "Failed to resend OTP. Please try again." });
  }
});

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
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("JWT_SECRET is not defined in .env file");
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    res.json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Login Error:", error);
    console.error("Error Details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      config: error.config,
      request: error.request,
      response: error.response,
    });
    res.status(500).send({ error: "Error logging in", details: error.message });
  }
});

const authMiddleware = require("./authMiddleware");
// Fetch Customers

app.get("/customers", authMiddleware, async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).send("Error fetching customers");
  }
});

// Add Customer
app.post("/customers", authMiddleware, async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.json(newCustomer);
  } catch (error) {
    res.status(500).send("Error adding customer");
  }
});

// Fetch All Orders
app.get("/orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).send("Error fetching orders");
  }
});

// Get Order by ID
app.get("/orders/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send("Order not found");
    res.json(order);
  } catch (error) {
    res.status(500).send("Error fetching order");
  }
});

// Add New Order
app.post("/orders", authMiddleware, async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json(newOrder);
  } catch (error) {
    res.status(500).send("Error adding order");
  }
});

// Update Order Status (or other fields)
app.patch("/orders/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // Allow updating multiple fields if needed

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedOrder) return res.status(404).json({ error: "Order not found" });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Server error while updating order" });
  }
});

// Delete Order
app.delete("/orders/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).send("Order not found");
    res.send("Order deleted");
  } catch (error) {
    res.status(500).send("Error deleting order");
  }
});

app.get("/api/sales", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find();
    let totalSales = 0;
    let totalVolume = 0;

    orders.forEach((order) => {
      totalSales += order.totalAmount;
      totalVolume += order.items.reduce((acc, item) => acc + item.quantity, 0);
    });

    const totalOrders = orders.length;
    const inProgress = await Order.countDocuments({ status: "In-Progress" });
    const completed = await Order.countDocuments({ status: "Completed" });
    const totalCustomers = await Customer.countDocuments();
    const abandonedCart = await Order.countDocuments({ status: "Pending" });

    res.json({
      totalSales,
      totalVolume,
      totalOrders,
      inProgress,
      completed,
      totalCustomers,
      abandonedCart,
    });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// Fetch Products
app.get("/products", authMiddleware, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send("Error fetching products");
  }
});

// Add Product
app.post("/product", authMiddleware, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).send("Error adding product");
  }
});

// Update Product Status
app.patch("/products/:id", authMiddleware, async (req, res) => {
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

app.get('/product/:id', authMiddleware, async (req, res) => {
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

app.put('/product/:id', authMiddleware, async (req, res) => {
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

app.delete('/product/:id', authMiddleware, async (req, res) => {
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

app.get("/api/inventory", authMiddleware, async (req, res) => {
  try {
    const lowStockCount = await Product.countDocuments({ quantity: { $lt: 5 } });
    const expiredCount = await Product.countDocuments({
      expiryDate: { $lt: new Date().toISOString() },
    });

    res.json({ lowStockCount, expiredCount });
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    res.status(500).json({ error: "Server error while fetching inventory data" });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
