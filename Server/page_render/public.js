let path = require('path');
let blogDB = require('../model/blog');
function renderPublic(app) {
  let pv = require('../middlewares/pv');
  app.get('/', function (req, res) { res.redirect('home'); });

  app.get('/home', pv.visite.bind(pv), function (req, res) {
    res.sendFile(path.join(__dirname, '../public/home/index.html'));
  });

  app.get('/category/:catename', pv.visite.bind(pv), function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/home/index.html'));
  });

  app.get('/catalog/book', pv.visite.bind(pv), function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/home/index.html'));
  });

  app.get('/blog/:id', pv.visite.bind(pv), function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/home/index.html'));
  });
}

module.exports = renderPublic;