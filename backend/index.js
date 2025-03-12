const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    console.error('Error creating product:', error); // Log the actual error
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
