const mongoose = require('mongoose');
let uid = require('./uid').getUid;

let draftSchema = mongoose.Schema({
  _id: Number,
  title: String,
  guide: String,
  md: String,
  time: {
    year: Number,
    month: Number,
    day: Number
  }
});


let draftModel = mongoose.model('draftdocs', draftSchema);

let draftDB = {
  insert,
  findById,
  getAllDraft,
  deleteById,
  update
};

function deleteById(id) {
  return draftModel.remove({ _id: id }).then((result) => {
    if (result.result.n > 0) {
      return 1;
    } else {
      return -1;
    }
  });
}

function update(data) {
  let id = data._id;
  return findById(id).then((draftDoc) => {
    if (draftDoc === -1) return -1;
    draftDoc.title = data.title;
    draftDoc.guide = data.guide;
    draftDoc.md = data.md;
    draftDoc.save();
    return 1;
  });
}

function insert(data) {
  return uid().then((id) => {
    data._id = id;
    new draftModel(data).save();
    return id;
  }).catch((err) => {
    return -1;
  })
}

function findById(id) {
  return draftModel.findById(id).then((draftDoc) => {
    if (draftDoc === null) {
      return -1;
    } else {
      return draftDoc;
    }
  });
}

function getAllDraft() {
  return draftModel.find();
}


module.exports = draftDB;