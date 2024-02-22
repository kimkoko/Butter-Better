const express = require('express');
const router = express.Router();
const { Book } = require('../db/models/book-model');

router.get('/', async (req, res, next) => {
    res.send('books')
});

module.exports = router;