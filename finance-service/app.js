// service-finance/app.js

const express = require('express');
const financeRoutes = require('./routes/financeRoutes');

const app = express();

app.use(express.json());

app.use('/finance', financeRoutes);

app.listen(4000, () => {
  console.log('Service Finance running on port 4000');
});
