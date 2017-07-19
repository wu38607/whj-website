const mongoose = require('mongoose');
let uid = require('./uid').getUid;

let sliderSchema = mongoose.Schema({
  _id: Number,
  img: String,
  title: String,
  url: String
});

let sliderModel = mongoose.model('sliderdocs', sliderSchema);

let sliderDB = {
  insert,
  findAll,
  deleteById,
  update
};

function insert(data) {
  return uid().then((id) => {
    data._id = id;
    new sliderModel(data).save();
    return id;
  }).catch((err) => {
    return -1;
  });
}

function deleteById(id) {
  return sliderModel.findById(id).then((doc) => {
    doc.remove();
    return doc.img;
  }).catch((err) => {
    return -1;
  });
}

function update(data) {
  return sliderModel.findById(data._id).then((doc) => {
    let oldImg = '';
    if (data.img !== doc.img) {
      oldImg = doc.img;
      doc.img = data.img;
    }
    doc.title = data.title;
    doc.url = data.url;
    doc.save();
    return oldImg;
  }).catch((err) => {
    return -1;
  });
}

function findAll() {
  return sliderModel.find().then((docs) => {
    return docs;
  }).catch((err) => {
    return -1;
  });
}

module.exports = sliderDB;