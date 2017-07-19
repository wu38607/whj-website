function getTime() {
  var nowDate = new Date();
  var time = {
    year: nowDate.getFullYear() - 2000,
    month: nowDate.getMonth() + 1,
    day: nowDate.getDate()
  };
  return time;
}

module.exports = getTime;