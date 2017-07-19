let path = require('path');
let admin = require('../middlewares/admin');

function renderAdmin(app) {
  app.get('/admin', admin.isRoot, function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/backstage/index.html'));
  });

  app.get('/admin/blog/:catename/:id', admin.isRoot, function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/backstage/index.html'));
  });

  app.get('/admin/draft/new', admin.isRoot, function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/backstage/index.html'));
  });
}

module.exports = renderAdmin;