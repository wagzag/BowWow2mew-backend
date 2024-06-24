const mongoose = require('mongoose');
const { Schema } = mongoose;
const getShortId = require('./types/short-id'); // shortId 함수를 가져옵니다.

async function createPostSchema() {
  const shortId = await getShortId;

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
      category: {
        type: String,
        required: true,
        enum: ['자유게시판', '입양/임시보호', '고민해결소', '자랑게시판', '추천place'],
      },
    },
    {
      timestamps: true,
    },
  );

  return mongoose.models.Post || mongoose.model('Post', PostSchema);
}

module.exports = createPostSchema;
