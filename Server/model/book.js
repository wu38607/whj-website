const mongoose = require('mongoose');

let bookSchema = mongoose.Schema({
  title: String,
  name: String,
  guide: String,
  pv: Number,
  cover: String,
  time: {
    year: Number,
    month: Number,
    day: Number
  }
});

let bookModel = mongoose.model('bookdocs', bookSchema);

bookDB = {
  check,
  findAll,
  getByName,
  update,
  pv
};

function getByName(name) {
  return bookModel.findOne({ name }).then((doc) => {
    return doc;
  }).catch((err) => {
    console.log(err);
    return -1;
  })
}

function pv(name) {
  getByName(name).then((doc) => {
    if (doc === null) return;
    if (doc.pv === undefined) {
      doc.pv = 1;
      doc.save();
      return;
    }
    ++doc.pv;
    doc.save();
  })
}

function update(data) {
  return getByName(data.name).then((doc) => {
    if (doc === null) return -1;
    doc.title = data.title;
    doc.time = data.time;
    doc.guide = data.guide;
    doc.cover = data.cover;
    doc.save();
    return 1;
  }).catch((err) => {
    console.log(err);
    return -1;
  });
}

function findAll() {
  return bookModel.find();
}

function check(files, time) {
  return bookModel.find().then((docs) => {
    let existBooks = [];
    for (let i = 0, n = files.length; i < n; i++) {
      let name = files[i], isFind = false;
      let data = { name, time, title: '未命名', cover: '' };
      for (let j = 0; j < docs.length; j++) {
        if (name === docs[j].name) {
          existBooks.push(docs.splice(j, 1)[0]._doc);
          isFind = true;
        }
      }
      if (!isFind) {
        insert(data);
        existBooks.push(data);
      }
    }
    for (let i = 0, n = docs.length; i < n; i++) {
      docs[i].remove();
    }
    return existBooks;
  }).catch((err) => {
    return -1;
  });
}

function insert(data) {
  new bookModel(data).save();
}

module.exports = bookDB;