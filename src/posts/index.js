const express = require('express');

const Post = require('./Post');

const postsApp = express();

postsApp.get('/', function list(req, res, next) {
  Post.find({}).sort('-date')
    .then(posts => res.send(posts))
    .catch(next);
});

postsApp.get('/:postId', function get(req, res, next) {
  Post.findById(req.params.postId)
    .then(post => res.send(post))
    .catch(next);
});

postsApp.post('/', function create(req, res, next) {
  const post = {
    editorState: req.body,
    date: new Date()
  };
  Post.create(post)
    .then(createdPost => res.status(200).send(createdPost))
    .catch(next);
});

module.exports = postsApp;
