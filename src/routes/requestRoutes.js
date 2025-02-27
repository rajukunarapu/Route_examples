const express = require('express');
const { sendingConnectionRequest, reviewConnectionRequest } = require('../controllers/requestController');
const { authMiddleware } = require('../middlewares/authMiddleware')

const router = express.Router(); //router instance

router.post('/send/:status/:userId', authMiddleware, sendingConnectionRequest)
router.post('/review/:status/:requestId', authMiddleware, reviewConnectionRequest)


module.exports = router