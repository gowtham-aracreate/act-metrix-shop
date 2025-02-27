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

const UserDetail = mongoose.model("User", UserSchema);

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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});