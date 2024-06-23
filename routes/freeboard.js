const express = require('express');
const mongoose = require('mongoose');
const createPostSchema = require('../models/schemas/post');
const router = express.Router();

createPostSchema().then(Post => {
  // CREATE - 게시물 생성
  router.post('/', async (req, res) => {
    const { title, content, userId } = req.body;
    try {
      const newPost = new Post({ title, content, user: userId, category: '자유게시판' });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // READ - 특정 카테고리의 게시물 조회
  router.get('/', async (req, res) => {
    try {
      const posts = await Post.find({ category: '자유게시판' }).populate('user', 'name');
      res.json(posts);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // READ - 특정 게시물 조회
  router.get('/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('user', 'name');
      if (!post) {
        return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
      }
      res.json(post);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // UPDATE - 게시물 수정
  router.put('/:id', async (req, res) => {
    const { title, content } = req.body;
    try {
      const post = await Post.findById(req.params.id);
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
  router.delete('/:id', async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) {
        return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
      }
      res.json({ message: '게시물이 삭제되었습니다.' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
});

module.exports = router;
