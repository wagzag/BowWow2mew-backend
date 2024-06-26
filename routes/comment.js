const { Router } = require('express');
const { Comment } = require('../models');
const loginRequired = require('../middlewares/login-required');
const { verify } = require('../utils/jwt');
const User = require('../models/schemas/User');

const router = Router();

router.get('/', async (req, res) => {
  const { postId } = req.query;

  const comments = await Comment.find({ postId });
  res.status(200).json({ messsage: 'SUCCESS', data: comments });
});

router.post('/', async (req, res) => {
  const { postId } = req.query;
  const { content } = req.body;
  const { category } = req.query;

  loginRequired(req);
  const email = verify(req);
  const user = await User.find({ email });

  if (!content) return res.send('nothing Content');
  const comment = await Comment.create({
    content,
    postId,
    category,
    userName: user[0].name,
  });

  res.json({ message: 'SUCCESS', comment });
});

router.put('/:commentId', async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  loginRequired(req);

  const findComment = await Comment.findOne({ commentId });
  if (!findComment) {
    res.json({ message: '존재하지 않는 댓글입니다.' });
  }

  const comment = await Comment.findOneAndUpdate(
    { commentId },
    { content },
    { new: true },
  );

  res.json({ message: 'SUCCESS', data: comment });
});

router.delete('/:commentId', async (req, res) => {
  const { commentId } = req.params;
  loginRequired(req);

  const comment = await Comment.deleteOne({ commentId });
  res.send({ message: 'SUCCESS', comment: comment });
});

module.exports = router;
