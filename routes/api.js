const { Router } = require('express');
const { Comment } = require('../models');

const router = Router();

router.get('/comments', async (req, res) => {
  const { postId } = req.query;

  const comments = await Comment.find({ postId });
  res.status(200).json({ messsage: 'SUCCESS', data: comments });
});

router.post('/comments', async (req, res) => {
  const { postId } = req.query;
  const { content } = req.body;
  const { category } = req.query;

  if (!content) return res.send('nothing Content');
  const comment = await Comment.create({ content, postId, category });

  res.json({ message: 'SUCCESS', data: comment });
});

router.put('/comments/:commentId', async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

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

router.delete('/comments/:commentId', async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.deleteOne({ commentId });
  res.send({ message: 'SUCCESS', comment: comment });
});

module.exports = router;
