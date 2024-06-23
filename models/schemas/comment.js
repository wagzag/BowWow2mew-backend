const Schema = require('mongoose');
const { shortId } = require('./types/short-id');

const CommentSchema = new Schema(
  {
    commentId: shortId,
    content: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

module.exports = CommentSchema;
