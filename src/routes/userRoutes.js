const express = require('express');
const { profileUpdate, profile, forgetPassword } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');


const router = express.Router();

router.get('/profile/view', authMiddleware, profile)
router.patch('/profile/edit', authMiddleware, profileUpdate)
router.patch('/profile/forgetPassword', authMiddleware, forgetPassword)

module.exports = router;