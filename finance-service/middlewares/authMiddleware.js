// service-auth/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = {
  requireAuth: (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Memverifikasi token JWT
    jwt.verify(authToken, 'your_secret_key', (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Mengambil data dari token JWT
      const userId = decodedToken.userId;

      // Menyimpan data userId pada objek req untuk penggunaan di middleware selanjutnya
      req.id = userId;

      next();
    });
    // redisClient.get(authToken, (error, userId) => {
    //   if (error || !userId) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    //   }

    //   // Simpan userId di objek request
    //   req.user = { id: userId };

    //   next();
    // });
  },
};
