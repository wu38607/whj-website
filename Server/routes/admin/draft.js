const express = require('express');
const router = express.Router();
const getTime = require('../../util/now-time');
const draftDB = require('../../model/draft');

router.post('/get', function (req, res) {
  draftDB.getAllDraft().then((draftDocs) => {
    let data = [];
    draftDocs.forEach((item) => {
      data.push(item._doc);
    });
    res.json({ errno: 0, data });
  })
});

router.post('/post', function (req, res) {
  let data = req.body;
  data.time = getTime();
  draftDB.insert(data).then((_id) => {
    if (_id !== -1) {
      res.send({ errno: 0, data: { _id } });
    } else {
      res.send({ errno: 1 });
    }
  });
});

router.post('/update', function (req, res) {
  let data = req.body;
  draftDB.update(data).then((err) => {
    if (err === -1)
      res.json({ errno: 1 });
    else
      res.json({ errno: 0 });
  })
});

router.post('/delete', function (req, res) {
  let id = req.body._id;
  draftDB.deleteById(id).then((err) => {
    if (err !== -1)
      res.json({ errno: 0 });
    else
      res.json({ errno: 1 })

  });
});

router.post('/:id.json', function (req, res) {
  let id = req.params.id;
  draftDB.findById(id).then((draftDoc) => {
    if (draftDoc !== -1) {
      let data = {
        title: draftDoc.title,
        guide: draftDoc.guide,
        md: draftDoc.md
      };
      res.json({ errno: 0, data });
    } else {
      res.json({ errno: 1 });
    }
  });
});

module.exports = router;