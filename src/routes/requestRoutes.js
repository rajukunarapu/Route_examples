const express = require('express');
const { connectionRequest } = require('../controllers/requestController');
const { authMiddleware } = require('../middlewares/authMiddleware')

const router = express.Router(); //router instance

router.post('/send/:status/:userId', authMiddleware, connectionRequest)


module.exports = router