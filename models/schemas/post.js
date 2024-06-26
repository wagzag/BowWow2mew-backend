const mongoose = require('mongoose');
const { Schema } = mongoose;
const shortId = require('./types/short-id'); // shortId 함수
const moment = require('moment'); // 날짜 형식화를 위해 moment.js 사용

const PostSchema = new Schema(
  {
    postId: {
      type: String,
      default: shortId,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      default: () => moment().format('YYYY-MM-DD HH:mm'),
    },
    category: {
      type: String,
      required: true,
      enum: ['freeboard', 'adoption', 'questions', 'boasts', 'recommend'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = PostSchema;
