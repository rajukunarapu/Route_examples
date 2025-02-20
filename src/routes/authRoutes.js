const express = require('express');
const { postUserData } = require('../controllers/authController')


const router = express.Router()

router.post('/signup', postUserData)


module.exports = router;