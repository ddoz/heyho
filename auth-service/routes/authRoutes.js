// service-auth/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/profile', authMiddleware.requireAuth, authController.getProfile);
router.post('/logout', authMiddleware.requireAuth, authController.logoutUser);

module.exports = router;
