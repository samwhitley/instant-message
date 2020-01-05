const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 9000;
const app = express();

app.get('/', (req, res) => {
  const dataPath = path.resolve('./api/data.json');
  const rawData = fs.readFileSync(dataPath);
  const data = JSON.parse(rawData);

  res.send(JSON.stringify(data));
});

app.listen(PORT, () => {
  console.log(`API Server is listening on port ${PORT}`);
});