// service-auth/controllers/authController.js

const { getUserByUsername, registerUser } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 10);
    await registerUser(username, hashedPassword);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const authToken = jwt.sign({ userId: user.username }, 'your_secret_key');
    res.status(200).json({ authToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.getProfile = async (req, res) => {
    try {
      // Dapatkan informasi pengguna dari authMiddleware
      const userId = req.user.id;
  
      // Ambil informasi profil pengguna dari database
      const user = await getUserByUsername(userId);
      
      // Hapus password dari objek user sebelum mengirimkan respons
      delete user.password;
      
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  };

exports.logoutUser = (req, res) => {
  const authToken = req.headers.authorization;

  redisClient.del(authToken, (error, result) => {
    if (error || result !== 1) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      res.status(200).json({ message: 'Logout successful' });
    }
  });
};
