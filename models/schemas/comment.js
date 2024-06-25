const { Schema } = require('mongoose');
const { shortId } = require('./types/short-id');

const CommentSchema = new Schema(
  {
    commentId: shortId,
    content: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    postId: String,
    category: {
      type: String,
      required: true,
      enum: ['free', 'adoption', 'question', 'boast', 'recommendation'],
    },
  },
  { timestamps: true },
);

module.exports = CommentSchema;
