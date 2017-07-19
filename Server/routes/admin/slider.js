const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sliderDB = require('../../model/slider');

router.post('/delete', function (req, res) {
  let id = req.body._id;
  sliderDB.deleteById(id).then((img) => {
    if (img === -1) return res.json({ errno: -1 });
    let pathName = path.join(__dirname, '../../../', '/store/images/', img);
    fs.unlink(pathName, (err) => {
      if (err) return res.json({ errno: -1 });
      res.json({ errno: 0 });
    });
  }); 22
});

router.post('/post', function (req, res) {
  let data = req.body;
  if (data._id === -1) {
    sliderDB.insert(data).then((id) => {
      if (id === -1) {
        res.json({ errno: 1 });
      } else {
        res.json({ errno: 0, data: { _id: id } });
      }
    });
  } else {
    sliderDB.update(data).then((oldImg) => {
      if (oldImg === -1) return res.json({ errno: -1 });
      if (oldImg === '') {
        return res.json({ errno: 0 });
      }
      let pathName = path.join(__dirname, '../../../', '/store/images/', oldImg);
      fs.unlink(pathName, (err) => {
        if (err) return res.json({ errno: -1 });
        res.json({ errno: 0 });
      });
    });
  }
});

module.exports = router;