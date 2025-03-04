const express = require('express')
const { recievedConnections, feed, acceptedConnections } = require('../controllers/userController')
const { authMiddleware } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/receivedConnections', authMiddleware, recievedConnections)
router.get('/acceptedConnections', authMiddleware, acceptedConnections)  //connections
router.get('/feed', authMiddleware, feed)


module.exports = router
