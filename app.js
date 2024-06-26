require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
<<<<<<< feat/board
const path = require('path'); 
=======
const routes = require('./routes');
const cors = require('cors');

>>>>>>> main
const app = express();
const { PORT, MONGO_URI } = process.env;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB 연결
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('connected to mongodb...')) // 필요시 console.log 사용 허용
  .catch(err => console.error(err));

<<<<<<< feat/board
require('./models/schemas/post');
require('./models/schemas/User');

const routes = require('./routes');
app.use('/', routes);
=======
app.use(cors({ origin: '*' }));
app.use('/api', routes);
>>>>>>> main

// 루트 경로 핸들러 추가
  // app.get('/', (req, res) => {
  //   res.send('Welcome to the API');
  // });

// 서버 시작
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}...`); // 필요시 console.log 사용 허용
});

app.use(express.static(path. join(__dirname, 'BowWow2mew-frontend/build')));
app.get('/',function(요청,응답){
  응답.sendfile(path.join(__dirname,'BowWow2mew-frontend/build/index.html'))
})