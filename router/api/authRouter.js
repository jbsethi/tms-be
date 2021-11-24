const express = require('express');

const router = express.Router();

router.post('/login', (req, res, next) => {
  res.send('login reqest made successfully !');
});

module.exports = router;