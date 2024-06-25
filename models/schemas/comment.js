const { Schema } = require('mongoose');
const { shortId } = require('./types/short-id');

const CommentSchema = new Schema(
  {
    commentId: shortId,
    content: String,
    userName: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['free', 'adoption', 'question', 'boast', 'recommendation'],
    },
  },
  { timestamps: true },
);

module.exports = CommentSchema;
