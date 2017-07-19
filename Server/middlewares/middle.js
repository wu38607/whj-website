let cookieSecret = require('../config').cookieSecret;
function middle(app) {
  let cookieParser = require('cookie-parser');
  let bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser(cookieSecret));
}

module.exports = middle;