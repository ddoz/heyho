// service-auth/database/dbConnection.js

const mysql = require('mysql');

class DbConnection {
  constructor() {
    this.connection = null;
  }

  static getInstance() {
    if (!DbConnection.instance) {
      DbConnection.instance = new DbConnection();
    }
    return DbConnection.instance;
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (this.connection) {
        resolve(this.connection);
      } else {
        this.connection = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'sso'
        });

        this.connection.connect((err) => {
          if (err) {
            reject(err);
          } else {
            resolve(this.connection);
          }
        });
      }
    });
  }
}

module.exports = DbConnection;
