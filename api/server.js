const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const dataPath = path.resolve("./api/data.json");
  const rawData = fs.readFileSync(dataPath);
  const data = JSON.parse(rawData);

  res.send(data);
});

app.post("/", (req, res) => {
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`API Server is listening on port ${PORT}`);
});
