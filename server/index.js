const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const proxy = require('http-proxy-middleware');
app.use('/api', proxy({ target: 'http://localhost:3001', changeOrigin: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});