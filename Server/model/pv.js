const mongoose = require('mongoose');

let bookDB = require('../model/book');
let blogDB = require('../model/blog');

let pvSchema = mongoose.Schema({
  _id: Number, //0
  totalpv: Number
});

let pvModel = mongoose.model('pvdocs', pvSchema);

let pvDB = {
  initialize,
  update,
  getTotalpv
};

function update(today) {
  return getTotalpv().then((doc) => {
    let total = doc.totalpv + today;
    doc.totalpv = total;
    doc.save();
    return total;
  });
}

function getTotalpv() {
  return pvModel.findById(0).then((doc) => {
    return doc;
  }).catch();
}

function initialize() {
  return pvModel.find().then((docs) => {
    if (docs.length === 0) {
      return new pvModel({ _id: 0, totalpv: 0 }).save();
    }
  }).catch((err) => {
    console.log(err);
  });
};

module.exports = pvDB;