let blogDB = require('../model/blog');
let bookDB = require('../model/book');
let keyWords = ['spider', 'google'];

function seo(req, res, next) {
  let userAgent = req.headers['user-agent'];
  let isSpider = keyWords.
    some((key) => {
      return userAgent.toLowerCase().indexOf(key) !== -1
    });
  if (isSpider) {
    let path = req.path;
    if (path.indexOf('home') !== -1) {
      return renderHome(res);
    }
    if (path.indexOf('blog') !== -1) {
      return renderBlog(res, req.params.id);
    }
    if (path.indexOf('book') !== -1) {
      return renderBook(res);
    }
  } else {
    next();
  }
}

function renderBook(res) {
  bookDB.findAll().then((bookDocs) => {
    res.render('book', { bookDocs });
  });
}

function renderBlog(res, id) {
  blogDB.findById(id).then((blogDoc) => {
    res.render('blog', { blogDoc });
  });
}

function renderHome(res) {
  blogDB.getBlogs(0, 10).then((blogDocs) => {
    let blogs = [];
    for (let i = 0, n = blogDocs.length; i < n; i++) {
      blogs.push(_copyBlogFromDoc(blogDocs[i]));
    }
    res.render('home', { blogDocs });
  });
}

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

module.exports = seo;