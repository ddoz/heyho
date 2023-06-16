const mysql = require('mysql');

// Konfigurasi koneksi database
const dbConfig = {
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
};

// Buat koneksi pool
const pool = mysql.createPool(dbConfig);

// Mengeksekusi query dengan menggunakan koneksi pool
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  query,
};
