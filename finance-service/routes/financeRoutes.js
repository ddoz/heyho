// service-finance/routes/financeRoutes.js

const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/data', authMiddleware, financeController.getFinanceData);
router.get('/download', authMiddleware, financeController.downloadFinanceReport);

module.exports = router;
