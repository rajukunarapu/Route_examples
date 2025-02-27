const express = require('express');
const { connectionRequest, reviewConnectionRequest } = require('../controllers/requestController');
const { authMiddleware } = require('../middlewares/authMiddleware')

const router = express.Router(); //router instance

router.post('/send/:status/:userId', authMiddleware, connectionRequest)
router.post('/review/:status/:requestId', authMiddleware, reviewConnectionRequest)


module.exports = router