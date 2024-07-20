const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const User = require('./models/usermodel'); 

dotenv.config();

const app = express();

// Dummy users
const users = [
  { name: 'John Doe', latitude: 40.7128, longitude: -74.0060 },
  { name: 'Jane Smith', latitude: 40.73061, longitude: -73.935242 },
  { name: 'Sam Brown', latitude: 40.66551, longitude: -73.891889 },
  { name: 'Lucy Green', latitude: 40.706447, longitude: -74.009444 },
];

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Populate the database with sample users
const populateUsers = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);
    console.log('Users added successfully');
  } catch (err) {
    console.error('Error adding users:', err);
  }
};

populateUsers();

// Use user routes
app.use('/api/users', userRoutes);

// Use custom error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
