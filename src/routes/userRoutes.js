const express = require('express');
const { profileUpdate, profile } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');


const router = express.Router();

router.patch('/profileUpdate', authMiddleware, profileUpdate)
router.get('/profile', authMiddleware, profile)

module.exports = router;