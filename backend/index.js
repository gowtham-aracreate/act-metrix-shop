// const express = require('express');
// const app = express();
// const port = 3000;
// const cors = require('cors');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// app.use(cors());
// app.use(express.json());

// const connectDB = async () => {
//   await mongoose.connect('mongodb://localhost:27017/User');
//   console.log("Db connected");
// };
// connectDB();

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String
// });

// const UserDetail = mongoose.model("User", UserSchema);

// app.post('/create', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const data = await UserDetail.create({
//       name,
//       email,
//       password: hashedPassword
//     });
//     res.send(data);
//   } catch (error) {
//     res.status(500).send('Error creating user');
//   }
// });

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await UserDetail.findOne({ email });
//     if (!user) {
//       console.log('User not found');
//       return res.status(401).send('Invalid email or password');
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log('Password does not match');
//       return res.status(401).send('Invalid email or password');
//     }

//     res.send({ message: 'Login successful', redirectUrl: '/inventory' });
//   } catch (error) {
//     console.error('Error logging in user', error);
//     res.status(500).send('Error logging in user');
//   }
// });

// app.get('/get-user', async (req, res) => {
//   const data = await UserDetail.find();
//   res.json(data);
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });




// const express = require("express");
// const app = express();
// const port = 3000;
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/User", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("DB Connected");
//   } catch (error) {
//     console.error("Database connection failed:", error);
//   }
// };
// connectDB();

// // User Schema
// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// const UserDetail = mongoose.model("User", UserSchema);

// // Customer Schema
// const CustomerSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   orders: Number,
//   total: String,
//   customerSince: String,
//   status: String,
// });

// const Customer = mongoose.model("Customer", CustomerSchema);

// // Order Schema
// const OrderSchema = new mongoose.Schema({
//   orderDate: String,
//   orderType: String,
//   trackingID: String,
//   orderTotal: String,
//   action: String,
//   status: String,
// });

// const Order = mongoose.model("Order", OrderSchema);

// // Create User
// app.post("/create", async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const data = await UserDetail.create({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     res.send(data);
//   } catch (error) {
//     res.status(500).send("Error creating user");
//   }
// });

// // Login User
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await UserDetail.findOne({ email });
//     if (!user) {
//       return res.status(401).send("Invalid email or password");
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).send("Invalid email or password");
//     }

//     res.send("Login successful");
//   } catch (error) {
//     res.status(500).send("Error logging in");
//   }
// });

// // Fetch Customers
// app.get("/customers", async (req, res) => {
//   try {
//     const customers = await Customer.find();
//     res.json(customers);
//   } catch (error) {
//     res.status(500).send("Error fetching customers");
//   }
// });

// // Add Customer
// app.post("/customers", async (req, res) => {
//   try {
//     const newCustomer = new Customer(req.body);
//     await newCustomer.save();
//     res.json(newCustomer);
//   } catch (error) {
//     res.status(500).send("Error adding customer");
//   }
// });

// // Fetch Orders
// app.get("/orders", async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.json(orders);
//   } catch (error) {
//     res.status(500).send("Error fetching orders");
//   }
// });

// // Add Order
// app.post("/orders", async (req, res) => {
//   try {
//     const newOrder = new Order(req.body);
//     await newOrder.save();
//     res.json(newOrder);
//   } catch (error) {
//     res.status(500).send("Error adding order");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });




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

    await mongoose.connect("mongodb://localhost:27017/User");
     console.log("Database Connected");
};
connectDB();

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});


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
  status: String
});

const Customer = mongoose.model("Customer", CustomerSchema);

// Order Schema
const OrderSchema = new mongoose.Schema({
  orderDate: String,
  orderType: String,
  trackingID: String,
  orderTotal: String,
  action: String,
  status: String,
});

const Order = mongoose.model("Order", OrderSchema);

// Create User
app.post("/create", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await User.create({ name, email, password: hashedPassword });
    res.json(data);
  } catch (error) {
    res.status(500).send("Error creating user");
  }
});

// Login User
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
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
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).send("Error fetching orders");
  }
});
// Add Order
app.post("/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json(newOrder);
  } catch (error) {
    res.status(500).send("Error adding order");
  }
});
// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
