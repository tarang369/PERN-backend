const express = require('express');
const app = express();
const pool = require('./db');
app.listen((port = 5000), () => {
  console.log(`listening to ${port}`);
});
