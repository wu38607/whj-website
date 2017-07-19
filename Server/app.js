const express = require('express');
const path = require('path');
const router = require('./routes');
const app = express();

// initialize database
require('./model')().then(() => {

  // agenda
  require('./agenda');

  // middlewares
  require('./middlewares/middle')(app);

  // static
  require('./middlewares/static')(app);

  // public page
  require('./page_render').public(app);

  // admin page
  require('./page_render').admin(app);

  // API 
  app.use('/api/', router);

  // 404
  app.use(function (req, res) {
    res.sendFile(path.join(__dirname + '/public/html/404.html'));
  });

});

module.exports = app;