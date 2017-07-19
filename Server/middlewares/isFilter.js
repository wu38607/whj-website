let filterIPs = require('../config').filterIP;

module.exports = (ip) => {
  isFilter = filterIPs.some((item) => {
    return item === ip;
  });
  return isFilter;
}