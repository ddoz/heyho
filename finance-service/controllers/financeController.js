// service-finance/controllers/financeController.js

const { getFinanceData } = require('../models/financeModel');
const excel = require('exceljs');

const getFinanceData = async (req, res) => {
  try {
    const financeData = await getFinanceData();
    res.status(200).json(financeData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

const downloadFinanceReport = async (req, res) => {
  try {
    const financeData = await getFinanceData();

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Finance Data');
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Amount', key: 'amount', width: 15 },
    ];

    financeData.forEach((data) => {
      worksheet.addRow({
        id: data.id,
        name: data.name,
        amount: data.amount,
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      "attachment; filename='finance_report.xlsx'"
    );

    await workbook.xlsx.write(res);

    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = {
  getFinanceData,
  downloadFinanceReport
};
