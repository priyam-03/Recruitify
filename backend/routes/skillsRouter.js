const express = require('express');
const { isAuthenticatedUser } = require('../middleware/auth');  // Assuming authentication middleware
const { fetchAllSkills } = require('../controllers/skillsController');  // Correctly importing the controller

const router = express.Router();

router.route('/fetchAllSkills').get(fetchAllSkills);

module.exports = router;
