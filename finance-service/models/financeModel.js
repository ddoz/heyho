// service-finance/models/financeModel.js
const DbConnection = require('../database/dbConnection');

const dbConnection = DbConnection.getInstance();

// Fungsi untuk mendapatkan pengguna berdasarkan username
const getFinanceData = (username) => {
    return new Promise((resolve, reject) => {
      dbConnection.connect()
        .then((connection) => {
          const query = 'SELECT * FROM finance where username = ?';
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
    getFinanceData
  };
  