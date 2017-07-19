const express = require('express');
const app = express();
const path = require('path');
let apiRouter = express.Router();

apiRouter.post('/api/public/sheet.json', function (req, res) {
  let range = req.body;
  // console.info(`博客范围${range.start}到${range.end}`);
  let blogData = require('../../mock/sheet.json');
  res.json(blogData);
});

apiRouter.get('/api/public/pagecount.json', function (req, res) {
  res.json({
    errno: 0,
    pagecount: 5
  });
});

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

apiRouter.get('/api/public/blog/:id.json', function (req, res) {
  let blog = require('../../mock/blog.json');
  let id = req.params.id;
  // console.info(id);
  res.json(blog);
});

apiRouter.get('/api/public/book.json', function (req, res) {
  let books = require('../../mock/book.json');
  res.json(books);
});

apiRouter.get('/book/:id', function (req, res) {
  res.sendFile(path.join(__dirname, '../../mock/_book/index.html'));
});

apiRouter.get('/api/public/slider.json', function (req, res) {
  let slider = require('../../mock/slider.json');
  // console.info(id);
  res.json(slider);
});

apiRouter.post('/api/login', function (req, res) {
  res.json(
    {
      errno: 0
    }
  );
});

module.exports = apiRouter;