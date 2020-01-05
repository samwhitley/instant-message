const express = require('express');

const PORT = process.env.PORT || 9000;
const app = express();

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.listen(PORT, () => {
  console.log(`API Server is listening on port ${PORT}`);
});