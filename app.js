require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT, MONGO_URI } = process.env;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('connected to mongodb...'))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}...`);
});
