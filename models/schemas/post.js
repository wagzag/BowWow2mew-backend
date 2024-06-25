const mongoose = require('mongoose');
const { Schema } = mongoose;
const getShortId = require('./types/short-id'); // shortId 함수
const moment = require('moment'); // 날짜 형식화를 위해 moment.js 사용

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

  return mongoose.models.Post || mongoose.model('Post', PostSchema);
}

module.exports = createPostSchema;
