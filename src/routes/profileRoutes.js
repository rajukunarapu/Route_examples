const express = require('express');
const { profileUpdate, profileView, forgetPassword } = require('../controllers/profileController');
const { authMiddleware } = require('../middlewares/authMiddleware');


const router = express.Router();

router.get('/view', authMiddleware, profileView)
router.patch('/update', authMiddleware, profileUpdate)
router.patch('/forgetPassword', authMiddleware, forgetPassword)

module.exports = router;