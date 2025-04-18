

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");


const HTTP_PORT = 3000;
const WS_PORT = 4000;
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

const fs = require("fs");


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
  profileImage: { type: String, default: null },
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
  image: { type: String, default: null },

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
  lastOrderDate: Date,
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
// Add to your schemas section
const MessageSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // 'user' or 'customer'
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ConversationSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  customer: { type: String, required: true },
  messages: [MessageSchema],
  lastUpdated: { type: Date, default: Date.now }
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

const UserDetail = mongoose.model("User", UserSchema);
const Order = mongoose.model("Order", OrderSchema);
const Customer = mongoose.model("Customer", CustomerSchema);
const Product = mongoose.model("Product", ProductSchema);

// app.post('/upload-profile-image', uploadToS3);



//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };

// Email Utility
const sendOTPEmail = async (email, otp) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
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
// app.use("/uploads", express.static("uploads"));

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
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
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
        profileImage: user.profileImage || null,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send({ error: "Error logging in", details: error.message });
  }
});

// Dashboard Endpoints
const authMiddleware = require("./authMiddleware");

// Get conversations for a customer
app.get("/api/conversations/:customerId", authMiddleware, async (req, res) => {
  try {
    const conversations = await Conversation.findOne({ customerId: req.params.customerId })
      .populate('customerId', 'name email phone');
    res.json(conversations || { messages: [] });
  } catch (error) {
    res.status(500).json({ error: "Error fetching conversations" });
  }
});

// Send a message
app.post("/api/conversations/:customerId", authMiddleware, async (req, res) => {
  try {
    const { content, sender } = req.body;
    const customerId = req.params.customerId;

    console.log("Incoming message:", { customerId, content, sender });

    let conversation = await Conversation.findOne({ customerId });

    if (!conversation) {
      const customerData = await Customer.findById(customerId).select("name");

      if (!customerData) {
        return res.status(404).json({ error: "Customer not found" });
      }

      conversation = new Conversation({
        customerId,
        customer: customerData.name, 
        messages: []
      });
    }

    conversation.messages.push({ sender, content });
    conversation.lastUpdated = new Date();
    await conversation.save();

    res.json(conversation);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Error sending message" });
  }
});




// Get all conversations (for sidebar)
app.get("/api/conversations", authMiddleware, async (req, res) => {
  try {
    const conversations = await Conversation.find()
      .populate('customerId', 'name email phone')
      .sort({ lastUpdated: -1 });
      
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: "Error fetching conversations" });
  }
});

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
// Modified upload-profile endpoint
app.post("/upload-profile", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const file = req.file;

    // Upload to S3
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: "metrix-shop",
        Key: `profileImages/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    });

    const result = await upload.done();
    const imageUrl = result.Location;

    // Update the user's profile image in the database 
    const user = await UserDetail.findById(req.user.userId);
    if (user) {
      user.profileImage = imageUrl;
      await user.save();
    }

    return res.status(200).json({ 
      imageUrl,
      message: "Profile image updated successfully" 
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    return res.status(500).json({ error: "Image upload failed" });
  }
});
app.put(
  "/update-profile",
  authMiddleware,
  upload.single("profileImage"), 
  async (req, res) => {
    try {
      const { name, phone, address, city, country, state, profileImage } = req.body;

      const user = await UserDetail.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Update user fields if provided
      if (name) user.name = name;
      if (phone) user.phone = phone;
      if (address) user.address = address;
      if (city) user.city = city;
      if (country) user.country = country;
      if (state) user.state = state;
      
      // Handle profile image
      if (req.file) {
        // If we're using S3, the file was already uploaded using the upload middleware
        // So we just need to generate the S3 URL path
        try {
          const upload = new Upload({
            client: s3,
            params: {
              Bucket: "metrix-shop",
              Key: `profileImages/${Date.now()}-${req.file.originalname}`,
              Body: req.file.buffer,
              ContentType: req.file.mimetype,
            },
          });

          const result = await upload.done();
          user.profileImage = result.Location; // Store the full S3 URL
        } catch (err) {
          console.error("Error uploading to S3:", err);
          return res.status(500).json({ error: "Failed to upload image" });
        }
      } else if (profileImage) {
        // If profileImage URL is passed directly in the body (e.g., from a separate upload)
        user.profileImage = profileImage;
      }

      await user.save();

      res.json({ 
        message: "Profile updated successfully", 
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          city: user.city,
          country: user.country,
          state: user.state,
          profileImage: user.profileImage
        }
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Error updating profile", details: error.message });
    }
  }
);
app.use("/uploads", express.static("uploads"));
app.delete("/remove-profile-image", authMiddleware, async (req, res) => {
  try {
    const user = await UserDetail.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Optional: remove image file from disk using fs.unlink if you want
    user.profileImage = null;
    await user.save();
    console.log("Updated user:", user);
    res.json({ message: "Profile image removed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove image", details: err.message });
  }
});


app.get("/api/dashboard/summary", authMiddleware, async (req, res) => {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const currentDate = new Date().toISOString().split('T')[0];
    
    const [
      totalCustomers,
      activeCustomers,
      totalProducts,
      activeProducts,
      lowStockProducts,
      expiredProducts,
      pendingOrders,
      completedOrders,
      allOrders,
      abandonedCarts,
      recentWeekOrders,
      homeDeliveryOrders,
      pickupOrders,
      totalInventoryValue
    ] = await Promise.all([
      Customer.countDocuments(),
      Customer.countDocuments({ status: "Active" }),
      Product.countDocuments(),
      Product.countDocuments({ status: "Publish" }),
      Product.countDocuments({ quantity: { $lt: 20 } }),
      Product.countDocuments({ 
        expiryDate: { $lt: currentDate },
        status: "Publish"
      }),
      Order.countDocuments({ status: "Pending" }),
      Order.countDocuments({ status: "Completed" }),
      Order.find().populate('customerId', 'name email'),
      Order.countDocuments({ 
        status: "Pending",
        createdAt: { $lt: oneDayAgo }
      }),
      Order.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      Order.countDocuments({ orderType: "Home Delivery" }),
      Order.countDocuments({ orderType: "Pick Up" }),
      Product.aggregate([
        {
          $group: {
            _id: null,
            totalValue: { $sum: { $multiply: ["$quantity", "$sellingPrice"] } }
          }
        }
      ])
    ]);

    // Calculate metrics
    const totalSales = allOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const totalVolume = allOrders.reduce((sum, order) => {
      return sum + (order.items?.reduce((itemSum, item) => itemSum + (item.quantity || 0), 0) || 0);
    }, 0);

    const abandonedCartPercentage = pendingOrders > 0 
      ? Math.round((abandonedCarts / pendingOrders) * 100)
      : 0;

    // Get recent orders (last 5)
    const recentOrders = allOrders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    res.json({
      totals: {
        sales: totalSales,
        volume: totalVolume,
        customers: totalCustomers,
        products: totalProducts,
        orders: allOrders.length,
        recentWeekSales: recentWeekOrders,
        recentWeekOrders,
        inventoryValue: totalInventoryValue[0]?.totalValue || 0
      },
      statusCounts: {
        customers: {
          active: activeCustomers,
          inactive: totalCustomers - activeCustomers
        },
        products: {
          active: activeProducts,
          inactive: totalProducts - activeProducts,
          lowStock: lowStockProducts,
          expired: expiredProducts
        },
        orders: {
          pending: pendingOrders,
          completed: completedOrders,
          total: allOrders.length,
          abandoned: abandonedCarts,
          abandonedPercentage: abandonedCartPercentage,
          homeDelivery: homeDeliveryOrders,
          pickup: pickupOrders
        }
      },
      recentOrders: recentOrders.map(order => ({
        _id: order._id,
        customer: order.customerId?.name || 'Unknown',
        email: order.customerId?.email || '',
        totalAmount: order.totalAmount,
        status: order.status,
        orderDate: order.orderDate,
        items: order.items.map(item => ({
          productName: item.productName,
          price: item.price,
          quantity: item.quantity
        }))
      }))
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

app.get("/api/inventory/sales-summary", authMiddleware, async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const salesData = await Order.aggregate([
      {
        $match: {
          orderDate: { $gte: startDate.toISOString().split("T")[0] } // Match orderDate instead of createdAt
        }
      },
      {
        $group: {
          _id: "$orderDate", // Group by orderDate
          totalSales: { $sum: "$totalAmount" },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } },
      { 
        $project: {
          date: "$_id",
          sales: "$totalSales",
          orders: "$orderCount",
          _id: 0
        }
      }
    ]);

    res.json(salesData);
  } catch (error) {
    console.error("Sales summary error:", error);
    res.status(500).json({ error: "Failed to fetch sales summary data" });
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

app.put("/customers/:id", authMiddleware, async (req, res) => {
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

app.delete('/customers/:id', authMiddleware, async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findByIdAndDelete(customerId);
    
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error });
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
    const activeOrders = await Order.countDocuments({ status: { $in: ["Pending", "Processing"] } });
    const pendingOrders = await Order.countDocuments({ status: "Pending" });
    const completedOrders = await Order.countDocuments({ status: "Completed" });
    const totalCustomers = await Customer.countDocuments();
    const activeCustomers = await Customer.countDocuments({ status: "Active" });
    // const abandonedCart = await Order.countDocuments({ 
    //   status: "Pending", 
    //   createdAt: { $lt: new Date(Date.now() - 24*60*60*1000) } 
    // });
    const abandonedCustomers = await Customer.countDocuments({ 
      lastOrderDate: { $lt: new Date(Date.now() - 30*24*60*60*1000) },
      status: "Active"
    });

    const abandonedCart = await Order.countDocuments({ status: "Pending" });
    const homeDelivery = await Order.countDocuments({ orderType: "Home Delivery" });
    const pickUp = await Order.countDocuments({ orderType: "Pick Up" });
    res.json({
      totalSales,
      totalVolume,
      totalOrders,
      activeOrders,
      pendingOrders,
      completedOrders,
      totalCustomers,
      activeCustomers,
      abandonedCart,
      abandonedCustomers,
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
app.post("/product", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const productData = req.body;
    
    // Handle image upload to S3 if a file is provided
    if (req.file) {
      try {
        const upload = new Upload({
          client: s3,
          params: {
            Bucket: "metrix-shop",
            Key: `productImages/${Date.now()}-${req.file.originalname}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
          },
        });

        const result = await upload.done();
        productData.image = result.Location; // Store the S3 URL
      } catch (err) {
        console.error("Error uploading to S3:", err);
        return res.status(500).json({ error: "Failed to upload product image" });
      }
    }

    const newProduct = new Product(productData);
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
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


app.put("/product/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const productData = req.body;
    
    // Handle image upload to S3 if a file is provided
    if (req.file) {
      try {
        const upload = new Upload({
          client: s3,
          params: {
            Bucket: "metrix-shop",
            Key: `productImages/${Date.now()}-${req.file.originalname}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
          },
        });

        const result = await upload.done();
        productData.image = result.Location; // Store the S3 URL
      } catch (err) {
        console.error("Error uploading to S3:", err);
        return res.status(500).json({ error: "Failed to upload product image" });
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
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
app.post("/upload-product-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Upload to S3
    const uploadResult = new Upload({
      client: s3,
      params: {
        Bucket: "metrix-shop",
        Key: `productImages/${Date.now()}-${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      },
    });

    const result = await uploadResult.done();
    const imageUrl = result.Location;

    return res.status(200).json({ 
      imageUrl,
      message: "Product image uploaded successfully" 
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    return res.status(500).json({ error: "Image upload failed" });
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

app.get("/api/products", authMiddleware, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server error while fetching products" });
  }
} );

server.listen(WS_PORT, () => {
  console.log(`Server running on http://localhost:${WS_PORT}`);
  console.log(`Socket.IO server is ready for connections`);
});

app.listen(HTTP_PORT, () => {
  console.log(`Server running on http://localhost:${HTTP_PORT}`);
});

app.get("/api/orders/recent", authMiddleware, async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('customerId', 'name email');

    const formattedOrders = recentOrders.map(order => ({
      _id: order._id,
      orderDate: order.orderDate,
      status: order.status,
      items: order.items.map(item => ({
        productName: item.productName,
        price: item.price,
        quantity: item.quantity
      }))
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    res.status(500).json({ error: "Server error while fetching recent orders" });
  }
});

app.get("/api/inventory/sales-summary", authMiddleware, async (req, res) => {
  try {
    const { days = "7" } = req.query;
    const daysNum = parseInt(days);
    
    if (isNaN(daysNum)) {
      return res.status(400).json({ error: "Invalid days parameter" });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysNum);
    
    const salesData = await Order.aggregate([
      {
        $match: {
          orderDate: {
            $gte: startDate.toISOString(),
            $lte: new Date().toISOString()
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$orderDate" } } },
          totalSales: { $sum: "$totalAmount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } },
      { 
        $project: {
          date: "$_id",
          sales: "$totalSales",
          _id: 0
        }
      }
    ]);

    res.json(salesData);
  } catch (error) {
    console.error("Error fetching sales summary data:", error);
    res.status(500).json({ error: "Server error while fetching sales data" });
  }
});