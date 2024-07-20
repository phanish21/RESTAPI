const express = require('express');
const { getUsersWithinRadius } = require('../controllers/userController');

const router = express.Router();

// Define route for getting users within a radius
router.get('/', getUsersWithinRadius);

module.exports = router;
