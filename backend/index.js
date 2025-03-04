const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require("multer");

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/User');
  console.log("Db connected");
};
connectDB();

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const productSchema = new mongoose.Schema({
  productName: String,
  productCategory: String,
  sellingPrice: Number,
  costPrice: Number,
  quantity: Number,
  orderType: String,
  discount: Boolean,
  expiryDate: String,
  returnPolicy: Boolean,
  description: String,
  productImage: String, // Store image URL instead of Base64
});

const UserDetail = mongoose.model("User", UserSchema);
const Product = mongoose.model("Product", productSchema);

app.post('/create', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await UserDetail.create({
      name,
      email,
      password: hashedPassword
    });
    res.send(data);
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserDetail.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(401).send('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).send('Invalid email or password');
    }

    res.send({ message: 'Login successful', redirectUrl: '/inventory' });
  } catch (error) {
    console.error('Error logging in user', error);
    res.status(500).send('Error logging in user');
  }
});

app.get('/get-user', async (req, res) => {
  const data = await UserDetail.find();
  res.json(data);
});


// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Route to Add a Product with Image Upload
app.post("/products", upload.single("productImage"), async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData); // Convert string to JSON
    const newProduct = new Product({
      ...productData,
      productImage: req.file ? `/uploads/${req.file.filename}` : "",
    });
    await newProduct.save();
    res.status(201).json({ message: "Product saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save product" });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});