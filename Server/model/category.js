const mongoose = require('mongoose');

let cateSchema = mongoose.Schema({
  name: String,
  blogs: []
});

let cateModel = mongoose.model('categorydocs', cateSchema);

let cateDB = {
  insert,
  addBlog,
  findByName,
  deleteCate,
  changeName,
  findAllBlog,
  findAllCate
};

function insert(name) {
  return isExist(name).then((isExist) => {
    if (isExist) return false;
    new cateModel({ name }).save();
    return true;
  });
}

function findAllCate() {
  return cateModel.find();
}

function changeName(newName, oldName) {
  findblogDocs(oldName).then((blogDocs) => {
    for (let i = 0, n = blogDocs.length; i < n; i++) {
      blogDocs[i].category = newName;
      blogDocs[i].save();
    }
    cateDocs[0].name = newName;
    cateDocs[0].save();
    return 1;
  }).catch((NoFind) => {
    return NoFind;
  });
}

function findAllBlog(cateName) {
  return findblogDocs(cateName).then((blogDocs) => {
    return blogDocs;
  }).catch((err) => {
    return -1;
  });
}

function findblogDocs(cateName) {
  return findByName(cateName).then((cateDocs) => {
    if (cateDocs.length === 0) return -1;
    let promiseArr = [];
    let blogs = cateDocs[0].blogs;
    for (let i = 0, n = blogs.length; i < n; i++) {
      let findBlog = require('./blog').findById;
      promiseArr.push(findBlog(blogs[i]));
    }
    return promiseArr;
  }).then((promiseArr) => {
    return Promise.all(promiseArr);
  })
}

function addBlog(cateName, blogId) {
  return findByName(cateName).then((docs) => {
    if (docs.length === 0) return false;
    docs[0].blogs.push(blogId);
    docs[0].save();
    return true;
  });
}

function findByName(name) {
  return cateModel.find({ 'name': name });
}

function isExist(name) {
  return findByName(name).then((docs) => {
    return docs.length > 0;
  })
}

function deleteCate(name) {
  return findByName(name).then((docs) => {
    if (docs.length === 0 || docs[0].blogs.length > 0) return -1;
    docs[0].remove();
    return 1;
  });
}

module.exports = cateDB;