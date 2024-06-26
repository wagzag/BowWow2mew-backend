const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/schemas/post'); 
const User = require('../models/schemas/User');
const router = express.Router();

// CREATE - 게시물 생성
router.post('/', async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId); // new 키워드 추가
    const user = await User.findById(userObjectId); // 사용자 정보 가져오기
    if (!user) {
      return res.status(400).json({ error: '유효하지 않은 사용자 ID입니다.' });
    }
    const newPost = new Post({ title, content, userName: user.name, category: 'freeboard' });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ - 특정 카테고리의 게시물 조회
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({ category: 'freeboard' }).populate('user', 'name');
    res.json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ - 특정 게시물 조회
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findOne({ postId: req.params.postId });
    if (!post) {
      return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
    }
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE - 게시물 수정
router.put('/:postId', async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.findOne({ postId: req.params.postId });
    if (!post) {
      return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
    }
    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - 게시물 삭제
router.delete('/:postId', async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ postId: req.params.postId });
    if (!post) {
      return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
    }
    res.json({ message: '게시물이 삭제되었습니다.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
