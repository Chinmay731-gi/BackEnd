const express = require('express');
const {handleUserSignup,handleUserLogin} = require('../controllers/user.js');
const router = express.Router();

router.post('/signup',handleUserSignup);
router.post('/login',handleUserLogin);

module.exports = router;