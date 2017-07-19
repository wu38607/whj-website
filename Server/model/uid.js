const mongoose = require('mongoose');

let uidSchema = mongoose.Schema({
  _id: Number,
  count: Number
});

let uidModel = mongoose.model('uids', uidSchema);

// crate uid
function initialize() {
  let promise = uidModel.find();
  return promise.then((doc) => {
    if (doc.length === 0) {
      let newUid = new uidModel({ _id: 0, count: 0 });
      return newUid.save();
    }
  }).catch((err) => {
    console.log(err);
  });
};

function uid() {
  return uidModel.findById(0)
    .then((doc) => {
      let id = ++doc.count;
      return doc.save().then(() => {
        return id;
      })
    });
}

module.exports = {
  initialize: initialize,
  getUid: uid
}