const express = require('express')
const { recievedConnections, usersFeed, acceptedConnections } = require('../controllers/userController')
const { authMiddleware } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/receivedConnections', authMiddleware, recievedConnections)
router.get('/feed', authMiddleware, usersFeed)
router.get('/acceptedConnections', authMiddleware, acceptedConnections)


module.exports = router
