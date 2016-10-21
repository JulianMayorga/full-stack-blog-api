const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    editorState: {
      entityMap: {
        type: Object,
        required: true,
        default: {}
      },
      blocks: {
        type: [],
        required: true
      }
    },
    date: {
      type: Date,
      required: true
    }
  },
  { minimize: false }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
