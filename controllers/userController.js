const User = require('../models/usermodel');
const haversine = require('../utils/haversine');

const getUsersWithinRadius = async (req, res) => {
  const { latitude, longitude, page = 1, limit = 10 } = req.query;

  // Check if latitude and longitude are provided
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Missing latitude or longitude' });
  }

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  // Validate latitude and longitude
  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ error: 'Invalid latitude or longitude' });
  }

  try {
    // Fetch all users
    const users = await User.find();
    // Filter users within 10 km radius
    const usersWithinRadius = users.filter(user => {
      const distance = haversine(lat, lon, user.latitude, user.longitude);
      return distance <= 10;
    });

    // Sort users by distance
    usersWithinRadius.sort((a, b) => {
      const distanceA = haversine(lat, lon, a.latitude, a.longitude);
      const distanceB = haversine(lat, lon, b.latitude, b.longitude);
      return distanceA - distanceB;
    });

    // Pagination logic
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsers = usersWithinRadius.slice(startIndex, endIndex);

    // Respond with paginated users
    res.json({
      users: paginatedUsers,
      total: usersWithinRadius.length,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getUsersWithinRadius,
};
