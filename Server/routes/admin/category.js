const express = require('express');
const router = express.Router();
const cateDB = require('../../model/category');
const status = require('../../util/res');

router.post('/post', function (req, res) {
  let name = req.body.name;
  cateDB.insert(name).then((b) => {
    if (b)
      res.json(status.OK);
    else
      res.json(status.ERR);
  });
});

router.post('/delete', function (req, res) {
  let name = req.body.name;
  cateDB.deleteCate(name).then((err) => {
    if (err === 1)
      res.json(status.OK);
    else
      res.json(status.ERR)
  });
});

module.exports = router;