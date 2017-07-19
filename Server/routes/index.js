const admin = require('../middlewares/admin');
const router = require('express').Router();
const routerPublic = require('./public');
const routerAdmin = require('./admin');
const routerLogin = require('./login');

router.use('/public', routerPublic);

router.use('/admin', routerAdmin);

router.use('/login', routerLogin);

module.exports = router;