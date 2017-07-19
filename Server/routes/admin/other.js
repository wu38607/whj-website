const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const getTime = require('../../util/now-time');
const bookDB = require('../../model/book');
const pdDB = require('../../model/pv');
const fs = require('fs');
const isRoot = require('../../middlewares/admin').check;
const path = require('path');
let pvs = require('../../middlewares/pv');
router.post('/pv.json', function (req, res) {
  let data = [pvs.today, pvs.total];
  res.json({ errno: 0, data });
});

router.post('/image/post', function (req, res) {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = path.join(__dirname, '../../', '../store/images');
  form.parse(req, function (err, fields, Files) {
    if (err) {
      res.json({ errno: 1 });
      return err;
    }
    let imgSrc = Files.image.path.replace(/[^\/]*[\/]+/g, '');
    res.json({ errno: 0, data: { url: imgSrc } });
  });
});

router.post('/book/update', function (req, res) {
  let data = req.body;
  data.time = getTime();
  bookDB.update(data).then((err) => {
    if (err === -1) return res.json({ errno: 1 });
    return res.json({ errno: 0 });
  });
});

router.post('/book/refresh', function (req, res) {
  let bookPath = path.join(__dirname, '../../', '../store/books');
  fs.readdir(bookPath, ((err, files) => {
    if (err) {
      return res.json({ errno: 1 });
    }
    for (let i = 0; i < files.length; i++) {
      if (files[i] === '.git')
        files.splice(i, 1);
    };
    bookDB.check(files, getTime()).then((existBooks) => {
      if (existBooks === -1) return res.json({ errno: 1 });
      return res.json({ errno: 0, data: existBooks });
    })
  }));
});

router.post('/authority', function (req, res) {
  if (isRoot(req, res)) {
    res.json({ errno: 0 });
  } else {
    res.json({ errno: 1 });
  }
});

function _copyBook(docs) {
  let books = [];
  docs.forEach((item) => {
    books.push(item._doc);
  });
  return books;
}

module.exports = router;