const mongoose = require('mongoose');

// Define user schema with name, latitude, and longitude fields
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

// Create User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
