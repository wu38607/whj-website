let pvDoc = require('../model/pv');
let isFilter = require('../middlewares/isFilter');
class Pv {
  constructor() {
    this.todayPv = 0;
    this.totalPv = 0;
    pvDoc.getTotalpv().then((doc) => {
      this.totalPv = doc.totalpv;
    });
  }

  get today() {
    return this.todayPv;
  }

  get total() {
    return this.totalPv;
  }

  increase() {
    this.totalPv++;
    this.todayPv++;
  }

  update() {
    pvDoc.update(this.todayPv).then((total) => {
      this.totalPv = total;
      this.todayPv = 0;
    });
  }

  visite(req, res, next) {
    isFilter(req.ip.substr(7)) || this.increase();
    next();
  }
}

module.exports = new Pv();