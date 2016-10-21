const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const cors = require('cors');

const errorHandler = require('./error-handler');
const config = require('./config');
const postsApp = require('./posts');

const app = express();
mongoose.Promise = Promise;
mongoose.connect(`${config.dbUrl}/full-stack-blog`);
const db = mongoose.connection;

app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postsApp);
app.use(errorHandler);

module.exports = function listen() {
  if (config.port) {
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function onDatabaseOpen() {
      app.listen(config.port, err => {
        if (err) {
          console.error(err);
        }
        console.log(`API listening on port ${config.port}!`);
      });
    });
  } else {
    console.error('==>     ERROR: No PORT environment variable has been specified');
  }
};
