const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
  res.send('login request made successfully !');
});

router.post('/logout', (req, res) => {
  res.send('logout request made successfully !');
})

router.post('/register', (req, res) => {
  res.send(req.body);
})

module.exports = router;