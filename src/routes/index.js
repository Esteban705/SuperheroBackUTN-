const express = require('express');
const router = express.Router();
const superheroRouter = require('./superheroRouter');
const authRouter = require('./authRouter');

router.use('/superheros', superheroRouter);
router.use('/auth', authRouter);

module.exports = router;