require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT, MONGO_URI } = process.env;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 몽고디비 연결
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to mongodb...'))
  .catch(err => console.error(err));

// 라우터 설정
const routes = require('./routes');
app.use('/', routes);

// 루트 경로 핸들러 추가
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}...`);
});
