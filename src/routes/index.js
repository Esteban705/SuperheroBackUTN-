const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');

// Rutas principales
router.use('/auth', authRouter);

module.exports = router;