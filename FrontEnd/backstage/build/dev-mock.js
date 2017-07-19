const express = require('express');
const app = express();
const path = require('path');

let apiRouter = express.Router();

apiRouter.get('/api/public/categories.json', function (req, res) {
  let categories = require('../../mock/categories.json');
  res.json(categories);
});

apiRouter.post('/api/public/blogsheet.json', function (req, res) {
  let categories = require('../../mock/blogsheet.json');
  let name = req.body.name;
  // console.info(name);
  res.json(categories);
});


apiRouter.get('/api/public/book.json', function (req, res) {
  let books = require('../../mock/book.json');
  res.json(books);
});

apiRouter.post('/api/admin/draft/get', function (req, res) {
  let drafts = require('../../mock/draftsheet.json');
  res.json(drafts);
});

apiRouter.post('/api/admin/draft/post', function (req, res) {
  let data = {
    errno: 0,
    data: {
      _id: 200
    }
  };
  res.json(data);
});

apiRouter.post('/api/admin/draft/update', function (req, res) {
  let data = {
    errno: 0
  };
  res.json(data);
});

apiRouter.post('/api/admin/draft/delete', function (req, res) {
  let data = {
    errno: 0
  };
  res.json(data);
});

apiRouter.post('/api/admin/draft/:id.json', function (req, res) {
  let drafts = require('../../mock/draft.json');
  res.json(drafts);
});

apiRouter.post('/api/admin/other/pv.json', function (req, res) {
  let pv = require('../../mock/pv.json');
  res.json(pv);
});

apiRouter.post('/api/admin/category/post', function (req, res) {
  let name = req.body.name;
  let data = {
    errno: 0
  };
  res.json(data);
});

apiRouter.post('/api/admin/blog/delete', function (req, res) {
  let id = req.body._id;
  // console.log(id);
  let data = {
    errno: 0
  };
  res.json(data);
});

apiRouter.post('/api/admin/blog/post', function (req, res) {
  let blog = req.body;
  // console.log(blog);
  let data = {
    'errno': 0,
    'data': {
      '_id': 100
    }
  };
  res.json(data);
});

apiRouter.post('/api/admin/blog/update', function (req, res) {
  let blog = req.body;
  // console.log(blog);
  let data = {
    'errno': 0,
    'data': {
      '_id': 101
    }
  };
  res.json(data);
});

apiRouter.post('/api/admin/category/delete', function (req, res) {
  let name = req.body.name;
  // console.log(name);
  let data = {
    errno: 0
  };
  res.json(data);
});

apiRouter.post('/api/admin/book/delete', function (req, res) {
  let name = req.body.name;
  // console.log(name);
  let data = {
    errno: 0
  };
  res.json(data);
});

apiRouter.get('/api/public/blog/:id.json', function (req, res) {
  let blog = require('../../mock/blog.json');
  let id = req.params.id;
  // console.info(id);
  res.json(blog);
});

apiRouter.get('/api/public/slider.json', function (req, res) {
  let slider = require('../../mock/slider.json');
  // console.info(id);
  res.json(slider);
});

apiRouter.post('/api/admin/slider/delete', function (req, res) {
  let id = req.body.id;
  // console.info(id);
  res.json({
    errno: 0
  });
});

apiRouter.post('/api/admin/slider/post', function (req, res) {
  let id = req.body.id;
  // console.info(id);
  res.json({
    errno: 0,
    data: {
      _id: 123
    }
  });
});

apiRouter.post('/api/admin/slider/update', function (req, res) {
  // console.info(id);
  res.json({
    errno: 0
  });
});

apiRouter.post('/api/admin/other/image/post', function (req, res) {
  res.json({
    errno: 0,
    data: {
      url: 'http://localhost:8000/static/img/slider_default.ecc8cb9.png'
    }
  });
});

apiRouter.post('/api/admin/other/book/update', function (req, res) {
  res.json({
    errno: 0
  });
});

module.exports = apiRouter;