const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.verify = req => {
  const token = req.headers['authorization']?.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { email: decoded.email };
  } catch (err) {
    return err.message;
  }
};
