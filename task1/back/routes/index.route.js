const express = require('express');
const router = express.Router();

const Sign = require('../controllers/Sign.controller')


router.post('/signup', Sign.Signup);
router.post('/signin', Sign.Signin)

module.exports = router;