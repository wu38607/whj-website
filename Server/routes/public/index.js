const express = require('express');
const router = express.Router();
const cateDB = require('../../model/category');
const blogDB = require('../../model/blog');
const sliderDB = require('../../model/slider');
const bookDB = require('../../model/book');
const status = require('../../util/res');
let filterIPs = require('../../config').filterIP;
let isFilter = require('../../middlewares/isFilter');
router.post('/sheet.json', function (req, res) {
  let start = req.body.start;
  let length = req.body.length;
  blogDB.getBlogs(start, length).then((blogDocs) => {
    let blogs = [];
    for (let i = 0, n = blogDocs.length; i < n; i++) {
      blogs.push(_copyBlogFromDoc(blogDocs[i]));
    }
    res.json({ errno: 0, blogs });
  })
});

router.get('/pagecount.json', function (req, res) {
  blogDB.count().then((count) => {
    count = Math.ceil(count / 10);
    count = count === 0 ? 1 : count;
    res.json({ errno: 0, pagecount: count });
  });
});

router.get('/categories.json', function (req, res) {
  cateDB.findAllCate().then((cateDocs) => {
    let data = [];
    for (let i = 0, n = cateDocs.length; i < n; i++) {
      data.push(cateDocs[i].name);
    }
    res.json({ errno: 0, data });
  });
});

router.post('/blogsheet.json', function (req, res) {
  let cateName = req.body.name;
  cateDB.findAllBlog(cateName).then((docs) => {
    if (docs === -1) {
      res.json(status.ERR);
    } else {
      let pagecount = Math.ceil(docs.length / 14);
      pagecount = pagecount === 0 ? 1 : pagecount;
      let blogs = [],
        end = -1,
        start = req.body.range.start,
        length = req.body.range.length;
      if (length === -1) { // 加载所有
        start = 0;
        end = docs.length;
      } else {
        start = docs.length - start - length;
        end = start + length;
        start = start < 0 ? 0 : start;
      }
      for (let i = start, n = end; i < n && i < docs.length; i++) {
        blogs.push(_copyBlogFromDoc(docs[i]));
      }
      res.json({
        errno: 0,
        data: {
          pagecount,
          blogs
        }
      })
    }
  });
});

router.get('/blog/:id.json', function (req, res) {
  let id = req.params.id;
  isFilter(req.ip.substr(7)) || blogDB.pv(id);
  blogDB.findById(id).then((blogDoc) => {
    if (blogDoc === -1) {
      res.json(status.ERR);
    } else {
      let blog = blogDoc._doc;
      cateDB.findAllBlog(blogDoc.category).then((blogDocs) => {
        let neighbor = {};
        for (let i = 0, n = blogDocs.length; i < n; i++) {
          if (blogDocs[i]._id == id) {
            let isPre = (i - 1) >= 0;
            let isNext = (i + 1) <= n - 1;
            neighbor.pre = {
              _id: isPre ? blogDocs[i - 1]._id : -1,
              title: isPre ? blogDocs[i - 1].title : ''
            };
            neighbor.next = {
              _id: isNext ? blogDocs[i + 1]._id : -1,
              title: isNext ? blogDocs[i + 1].title : ''
            };
            break;
          };
        };
        let data = { blog, neighbor };
        res.json({
          errno: 0,
          data
        });
      });
    }
  });
});

router.get('/book.json', function (req, res) {
  bookDB.findAll().then((docs) => {
    let data = [];
    docs.forEach((item) => {
      data.push(item._doc);
    });
    res.json({ errno: 0, data });
  });
});

router.get('/slider.json', function (req, res) {
  sliderDB.findAll().then((docs) => {
    if (docs === -1) return res.json({ errno: 1 });
    let data = [];
    docs.forEach((item) => {
      data.push(item._doc);
    });
    res.json({ errno: 0, data });
  })
});

function _copyBlogFromDoc(blogDoc) {
  let blog = {
    _id: blogDoc._id,
    title: blogDoc.title,
    guide: blogDoc.guide,
    time: {
      year: blogDoc.time.year,
      month: blogDoc.time.month,
      day: blogDoc.time.day,
    },
    pv: blogDoc.pv,
    category: blogDoc.category
  }
  return blog;
}


module.exports = router;