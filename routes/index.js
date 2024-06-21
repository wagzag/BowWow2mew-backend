const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // 상대 경로 수정

const router = express.Router();

// JWT 시크릿 키
const JWT_SECRET = process.env.JWT_SECRET;

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
  } catch (err) {
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
  } catch (err) {
    res.status(400).json({ error: '로그인 실패' });
  }
});

// 보호된 라우트 예시
router.get('/protected', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: '인증 토큰이 필요합니다.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: '보호된 데이터 접근 성공', data: decoded });
  } catch (err) {
    res.status(401).json({ error: '유효하지 않은 토큰입니다.' });
  }
});

module.exports = router;
