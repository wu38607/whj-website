const express = require('express');
const router = express.Router();

const blog = require('./blog');
const category = require('./category');
const draft = require('./draft');
const other = require('./other');
const slider = require('./slider');

router.use('/blog', blog);
router.use('/category', category);
router.use('/draft', draft);
router.use('/other', other);
router.use('/slider', slider);

module.exports = router;