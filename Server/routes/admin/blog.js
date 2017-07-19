const express = require('express');
const router = express.Router();
const blogDB = require('../../model/blog');
const status = require('../../util/res');
const getTime = require('../../util/now-time');

router.post('/post', function (req, res) {
  let data = req.body;
  data.time = getTime();
  blogDB.insert(data).then((id) => {
    if (id != -1) {
      let blog = {
        errno: 0,
        data: {
          _id: id
        }
      };
      res.json(blog);
    } else {
      res.json(status.ERR);
    }
  })
});

router.post('/update', function (req, res) {
  let data = req.body;
  data.time = getTime();
  blogDB.update(data).then((id) => {
    if (id != -1)
      res.json({ errno: 0, data: { _id: id } })
    else
      res.json({ errno: 1 });
  });
});

router.post('/delete', function (req, res) {
  blogDB.deleteById(req.body._id).then((b) => {
    if (b)
      res.json(status.OK);
    else
      res.json(status.ERR);
  });
});

module.exports = router;