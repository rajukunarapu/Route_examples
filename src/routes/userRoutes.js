const express = require('express')
const { recievedConnections, usersFeed } = require('../controllers/userController')
const { authMiddleware } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/receivedConnections', authMiddleware, recievedConnections)
router.get('/feed', authMiddleware, usersFeed)


module.exports = router
