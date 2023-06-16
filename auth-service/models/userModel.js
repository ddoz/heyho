// service-auth/models/userModel.js

const DbConnection = require('../config/database');

const dbConnection = DbConnection.getInstance();

// Fungsi untuk mendaftarkan pengguna baru
const registerUser = (username, password) => {
  return new Promise((resolve, reject) => {
    dbConnection.connect()
      .then((connection) => {
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        connection.query(query, [username, password], (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Fungsi untuk mendapatkan pengguna berdasarkan username
const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    dbConnection.connect()
      .then((connection) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        connection.query(query, [username], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};


module.exports = {
    registerUser,
    getUserByUsername
};
