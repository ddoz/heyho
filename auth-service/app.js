// service-auth/app.js

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const redis = require('redis');

// // Membuat koneksi Redis
// const redisClient = redis.createClient({
//   host: 'localhost', // Ganti dengan host Redis Anda jika diperlukan
//   port: 6379, // Ganti dengan port Redis Anda jika diperlukan
// });

// // Menghandle event ketika Redis berhasil terhubung
// redisClient.on('connect', () => {
//   console.log('Connected to Redis');
// });

// // Menghandle event ketika terjadi error pada Redis
// redisClient.on('error', (error) => {
//   console.error('Redis connection error:', error);
// });

// // Menyimpan Redis client sebagai variabel global
// global.redisClient = redisClient;

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Service Auth running on port 3000');
});

module.exports = app
