const { Schema } = require('mongoose');
const { shortId } = require('./types/short-id');

const PostSchema = new Schema(
  {
    postId: shortId,
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = PostSchema;
