const mongoose = require('mongoose');
const NoFind = -1;

let uid = require('./uid').getUid;

let blogSchema = mongoose.Schema({
  _id: Number,
  title: String,
  guide: String,
  article: String,
  md: String,
  time: {
    year: Number,
    month: Number,
    day: Number
  },
  pv: Number,
  category: String
});

let blogModel = mongoose.model('blogdocs', blogSchema);

let blogDB = {
  insert,
  getBlogs,
  update,
  deleteById,
  findById,
  count,
  pv,
  findAll
};

function findAll() {
  return blogModel.find();
}

function insert(data) {
  return uid().then((id) => {
    data._id = id;
    return id;
  }).then((id) => {
    let addToCate = require('./category').addBlog;
    return addToCate(data.category, id);
  }).then((b) => {
    if (!b) return NoFind;
    new blogModel(data).save();
    return data._id;
  }).catch((err) => {
    return NoFind;
  });
}

function pv(id) {
  findById(id).then((doc) => {
    if (doc === -1) return;
    if (doc.pv === undefined) {
      doc.pv = 1;
      doc.save();
      return;
    }
    ++doc.pv;
    doc.save();
  }).catch((err) => {
    console.log(err);
    return;
  });
}

function update(data) {
  return findById(data._id).then((doc) => {
    if (doc === -1) return NoFind;
    doc.title = data.title;
    doc.guide = data.guide;
    doc.article = data.article;
    doc.md = data.md;
    doc.time = data.time;
    doc.pv = data.pv;
    doc.category = data.category;
    doc.save();
    return data._id;
  });
}

function getBlogs(start, length) {
  return blogModel.find().then((docs) => {
    start = docs.length - start - length;
    let end = start + length - 1;
    start = start < 0 ? 0 : start;
    return docs.slice(start, end + 1);
  });
}

function count() {
  return blogModel.find().then((docs) => {
    return docs.length;
  })
}

function deleteById(blogId) {
  return findById(blogId).then((blogDoc) => {
    return _findCate(blogDoc);
  }).then((cateAndblog) => {
    return _deleteBlogAndCate(cateAndblog, blogId)
  }).catch((noFind) => {
    return false;
  })
}

function findById(blogId) {
  return new Promise((resolve, reject) => {
    blogModel.findById(blogId).then((blogDoc) => {
      if (blogDoc === null)
        throw (-1);
      else
        resolve(blogDoc);
    }).catch((NoFind) => {
      return NoFind;
    });
  });
}

function _findCate(blogDoc) {
  return new Promise((resolve, reject) => {
    let findCateByName = require('./category').findByName;
    findCateByName(blogDoc.category).then((cateDocs) => {
      if (cateDocs.length === 0)
        reject(NoFind);
      else
        resolve({ cateDocs, blogDoc });
    })
  });
}

function _deleteBlogAndCate(cateAndblog, blogId) {
  let cateDoc = cateAndblog.cateDocs[0];
  let blogDoc = cateAndblog.blogDoc;
  let blogIndex = -1;
  cateDoc.blogs.some((item, index) => {
    if (item === blogId) {
      blogIndex = index;
      return true;
    }
  });
  if (blogIndex !== -1) {
    cateDoc.blogs.splice(blogIndex, 1);
    cateDoc.save();
    blogDoc.remove();
    return true;
  } else {
    return false;
  }
}

module.exports = blogDB;