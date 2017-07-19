const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

module.exports = function () {
  return mongoose.connect('mongodb://127.0.0.1:27017/website',
    { useMongoClient: true }).then((db) => {
      return Promise.all([require('./uid').initialize()
        , require('./pv').initialize()]);
    }).catch((err) => {
      console.log(err);
    });
}