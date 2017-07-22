function pv(agenda) {
  let pvDB = require('../model/pv');
  let pv = require('../middlewares/pv');

  agenda.define('update pv', function (job, done) {
    pv.update();
    done();
  });

  agenda.on('ready', function () {
    agenda.create('update pv').schedule('0am').repeatEvery('1 days').save();
    agenda.start();
  });
}

module.exports = pv;