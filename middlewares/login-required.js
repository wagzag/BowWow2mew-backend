module.exports = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.redirect('/');
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: '보호된 데이터 접근 성공', data: decoded });
  } catch (err) {
    res
      .status(401)
      .json({ error: err }, { message: '유효하지 않은 토큰입니다.' });
  }
};
