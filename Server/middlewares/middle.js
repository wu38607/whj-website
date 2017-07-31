const cookieSecret = require('../config').cookieSecret;
const path = require('path');
function middle(app) {
  let cookieParser = require('cookie-parser');
  let bodyParser = require('body-parser');
  app.set('views', path.join(__dirname, '../', 'views'));
  app.set('view engine', 'ejs')
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser(cookieSecret));
}

module.exports = middle;