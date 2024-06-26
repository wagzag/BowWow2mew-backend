module.exports = req => {
  const token = req.headers.authorization.split(' ')[1];

  if (token === 'null') {
    res.status(400).res.json({ message: '로그인이 필요합니다.', token });
    return;
  }
};
