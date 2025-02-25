const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')

const authMiddleware = async (req, res, next) => {
    const { token } = req.cookies
    try {
        if (!token) {
            throw new Error('Invalid token')
        }
        const decoded = await jwt.verify(token, `${process.env.JWT_SECRETE}`)
        req._id = decoded._id
        next()

    } catch (error) {
        res.status(400).json({ message: "ERROR : " + error.message })
    }


}

module.exports = { authMiddleware }