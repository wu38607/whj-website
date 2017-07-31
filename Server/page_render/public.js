let path = require('path');
let blogDB = require('../model/blog');
let seo = require('../middlewares/seo');

function renderPublic(app) {
  let pv = require('../middlewares/pv');
  app.get('/', function (req, res) { res.redirect('home'); });

  app.get('/home', seo, pv.visite.bind(pv), function (req, res) {
    res.sendFile(path.join(__dirname, '../public/home/index.html'));
  });

  app.get('/category/:catename', pv.visite.bind(pv), function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/home/index.html'));
  });

  app.get('/catalog/book', seo, pv.visite.bind(pv), function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/home/index.html'));
  });

  app.get('/blog/:id', seo, pv.visite.bind(pv), function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/home/index.html'));
  });
}

module.exports = renderPublic;