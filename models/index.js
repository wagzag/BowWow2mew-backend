const mongoose = require('mongoose');
const PostSchema = require('./schemas/post');
const CommentSchema = require('./schemas/comment');

const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);

exports.Post = Post;
exports.Comment = Comment;
