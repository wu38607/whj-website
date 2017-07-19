const express = require('express');
const router = express.Router();
let admin = require('../../config').admin;

router.post('/', function (req, res) {
  let password = admin.password;
  let username = admin.username;
  let bool1 = req.body.username === username;
  let bool2 = false;
  if (admin.md5) {
    let crypto = require('crypto');
    let md5 = crypto.createHash('md5');
    bool2 = md5.update(req.body.password).digest('hex') === password;
  } else {
    bool2 = req.body.password === password;
  }
  if (bool1 && bool2) {
    res.cookie('authority', 'root', { expires: new Date(Date.now() + 9999999), httpOnly: true, signed: true });
    res.json({
      errno: 0
    })
  } else {
    res.clearCookie('authority');
    res.json({
      errno: 1
    })
  }
});

module.exports = router;