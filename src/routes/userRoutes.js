const express = require('express');
const { profileUpdate, profile } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');


const router = express.Router();

router.patch('/profile/edit', authMiddleware, profileUpdate)
router.get('/profile/view', authMiddleware, profile)

module.exports = router;