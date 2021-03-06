const express = require('express');

const AuthController =  require('../../controllers/AuthController');

const router = express.Router();

router.post('/login', AuthController.login);

router.post('/logout', AuthController.logOut)

router.post('/signup', AuthController.signUp)

module.exports = router;