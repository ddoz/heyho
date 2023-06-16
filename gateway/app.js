// gateway/app.js

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Middleware untuk mengarahkan permintaan ke service auth
app.use('/auth', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true, onError: handleProxyError }));

// Middleware untuk mengarahkan permintaan ke service finance
app.use('/finance', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: true, onError: handleProxyError }));

// Penanganan kesalahan pada proxy middleware
function handleProxyError(err, req, res) {
  console.error('Proxy Error:', err);
  res.status(500).json({ message: 'An error occurred while forwarding the request' });
}

// Penanganan kesalahan pada gateway
app.use((err, req, res, next) => {
  console.error('Gateway Error:', err);
  res.status(500).json({ message: 'An error occurred in the gateway' });
});

app.listen(5000, () => {
  console.log('Gateway running on port 5000');
});
