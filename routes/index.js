const express = require('express');
const bcrypt = require('bcryptjs'); // bcrypt 대신 bcryptjs 사용
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // 상대 경로 수정

const router = express.Router();

// JWT 시크릿 키
const JWT_SECRET = 'your_jwt_secret_key';

// 회원가입 라우트
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: '이미 사용 중인 이메일입니다.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    res.status(201).json({ message: '회원가입 성공', email: user.email });
  } catch (error) {
    res.status(400).json({ error: '회원가입 실패' });
  }
});

// 로그인 라우트
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ error: '로그인 실패' });
    }
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: '로그인 실패' });
  }
});

module.exports = router;
