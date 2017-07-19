function static(app) {
  let express = require('express');
  let path = require('path');
  let bookVisited = require('../middlewares/bookvisted');

  app.use(express.static(path.join(__dirname, '../public'), { index: false }));
  app.use(express.static(path.join(__dirname, '../public/home'), { index: false }));
  app.use(express.static(path.join(__dirname, '../public/backstage'), { index: false }));
  app.use(express.static(path.join(__dirname, '../../', '/store/images'), { index: false }));
  app.use('/home', express.static(path.join(__dirname, '../../', '/store/images'), { index: false }));
  app.use('/catalog', express.static(path.join(__dirname, '../../', '/store/images'), { index: false }));
  app.use('/book', bookVisited, express.static(path.join(__dirname, '../../', '/store/books/')));
}

module.exports = static;