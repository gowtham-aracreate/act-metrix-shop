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
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  country: { type: String, default: "" },
  state: { type: String, default: "" },
  // profileImage: { type: String, default: "" },
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
 customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  customer: { type: String, required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    total: { type: Number, required: true }
  }],
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
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); 

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

    res.json({
      token,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        country: user.country,
        state: user.state,
        // profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send({ error: "Error logging in", details: error.message });
  }
});

const authMiddleware = require("./authMiddleware");

app.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await UserDetail.findById(req.user.userId).select("-password"); 
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.put("/update-profile", authMiddleware, async (req, res) => {
  try {
    const { name, phone, address, city, country, state } = req.body;

    const user = await UserDetail.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (city) user.city = city;
    if (country) user.country = country;
    if (state) user.state = state;
    // if (profileImage) user.profileImage = profileImage;

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Error updating profile", details: error.message });
  }
});



// Fetch Customers
app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find(); // Fetch all customers

    const customersWithOrders = await Promise.all(
      customers.map(async (customer) => {
        const orders = await Order.find({ customerId: customer._id }); // Fetch orders for each customer

        const totalOrders = orders.length;
        const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);

        return {
          ...customer.toObject(),
          orders: orders, // Store orders as an array
          total: `$${totalAmount.toFixed(2)}`,
        };
      })
    );

    res.status(200).json(customersWithOrders);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Error fetching customers", error });
  }
});

app.get("/customers/:id", authMiddleware, async (req, res) => {
  try {
    // Check if the ID is valid
    if (!req.params.id || req.params.id === 'undefined') {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send("Customer not found");
    res.json(customer);
  } catch (error) {
    res.status(500).send("Error fetching customer");
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

app.put("/customers/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true,
        context: 'query' // This helps catch validation errors
      }
    );

    if (!updatedCustomer) {
      return res.status(500).json({ error: "Failed to update customer" });
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error("Detailed Error updating customer:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
      details: error
    });
    res.status(500).json({ 
      error: "Internal Server Error", 
      message: error.message,
      details: error.toString() 
    });
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
    const updateData = req.body; 

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

app.get("/orders/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate("customer");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.patch("/orders/:orderId/items/:itemId", async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const item = order.items.find((item) => item._id.toString() === itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.status = status;
    await order.save();
    
    res.json({ message: "Item status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating item status", error });
  }
});

app.get("/api/orders/customer/:id", authMiddleware, async (req, res) => {
  try {
    const customerId = req.params.id;

    // Validate customerId
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ error: "Invalid customer ID" });
    }

    // Find orders related to the customer
    const orders = await Order.find({ customerId }).populate("customerId", "name email");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this customer" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    res.status(500).json({ error: "Server error while fetching orders" });
  }
});

app.get("/api/sales/customer/:customerId", authMiddleware, async (req, res) => {
  try {
    const { customerId } = req.params;
  

    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    const orders = await Order.find({ customerId });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this customer" });
    }

    let totalSales = 0;
    let totalVolume = 0;
    orders.forEach((order) => {
      totalSales += order.totalAmount || 0;
      totalVolume += (order.items || []).reduce((acc, item) => acc + (item.quantity || 0), 0);
    });

    const totalOrders = orders.length;
    const inProgress = await Order.countDocuments({ customerId, status: "In-Progress" });
    const completed = await Order.countDocuments({ customerId, status: "Completed" });
    const abandonedCart = await Order.countDocuments({ customerId, status: "Pending" });
    const homeDelivery = await Order.countDocuments({ customerId, orderType: "Home Delivery" });
    const pickUp = await Order.countDocuments({ customerId, orderType: "Pick Up" });

    const responseData = {
      totalSales,
      totalVolume,
      totalOrders,
      inProgress,
      completed,
      abandonedCart,
      homeDelivery,
      pickUp,
    };


    res.json(responseData);
  } catch (error) {
    console.error("Error fetching customer sales data:", error);
    res.status(500).json({ message: "Server Error" });
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
    const homeDelivery = await Order.countDocuments({ orderType: "Home Delivery" });
    const pickUp = await Order.countDocuments({ orderType: "Pick Up" });
    res.json({
      totalSales,
      totalVolume,
      totalOrders,
      inProgress,
      completed,
      totalCustomers,
      abandonedCart,
      homeDelivery,
      pickUp
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
    const lowStockCount = await Product.countDocuments({ quantity: { $lt: 20 } });
    const expiredCount = await Product.countDocuments({
      expiryDate: { $lt: new Date().toISOString() },
    });

    res.json({ lowStockCount, expiredCount });
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    res.status(500).json({ error: "Server error while fetching inventory data" });
  }
});

app.get('/orders/product/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.find({ 'items.productId': id });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders for the product" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


