let isFilter = require('./isFilter');
function bookVisited(req, res, next) {
  let bookDB = require('../model/book');
  let paths = req.url;
  let path = paths.split('\/');
  if (path.length === 3 && path[2] === '') {
    isFilter(req.ip.substr(7)) || bookDB.pv(path[1]);
  }
  next();
}

module.exports = bookVisited;