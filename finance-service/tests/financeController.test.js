// service-finance/tests/financeController.test.js

const request = require('supertest');
const app = require('../app');
const { getFinanceData } = require('../models/financeModel');

describe('Finance Service', () => {
  afterAll(() => {
    // Clean up database or perform any necessary teardown
  });

  describe('GET /data', () => {
    it('should get finance data', async () => {
      const response = await request(app).get('/data');

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
    });
  });

  describe('GET /download', () => {
    it('should download finance report', async () => {
      const response = await request(app).get('/download');

      expect(response.statusCode).toBe(200);
      expect(response.header['content-type']).toBe(
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
    });
  });
});
