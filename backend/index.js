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

//Product Schema
const productSchema = new mongoose.Schema({
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

// Order Schema
const OrderSchema = new mongoose.Schema({
  orderDate: String,
  orderType: String,
  trackingID: String,
  orderTotal: String,
  action: String,
  status: String,
});

const UserDetail = mongoose.model("User", UserSchema);
const Product = mongoose.model("Product", productSchema);
const Customer = mongoose.model("Customer", CustomerSchema);
const Order = mongoose.model("Order", OrderSchema);

// Create User
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

// Login User
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

//Inventory Page
app.post('/product', async (req, res) => {
  const { productName, productCategory, sellingPrice, costPrice, quantity, discount, discountValue, expiryDate, returnPolicy, shortDescription, longDescription, dateAdded, time, status} = req.body; 

  try {
    const product = await Product.create({
      productName,
      productCategory,
      sellingPrice,
      costPrice,
      quantity,
      discount, 
      discountValue, 
      expiryDate,
      returnPolicy,
      shortDescription,
      longDescription, 
      dateAdded, 
      time, 
      status
    });
    res.send(product);
  } catch (error) {
    console.error('Error creating product:', error); 
    res.status(500).send('Error creating product');

  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send('Error fetching products');
  }
});

app.patch('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Returns the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product status:", error);
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
