const userModel = require('../models/userModel')
const validator = require('validator')
const bcrypt = require('bcrypt')

// user-profile request handler
exports.profileView = async (req, res) => {
    try {
        const loggedInUserId = req._id
        const user = await userModel.findById(loggedInUserId)
        if (!user) {
            return res.status(404).json({ message: 'user data not found' })
        } else {
            res.json({ message: "fetched data successfully", data: user })
        }
    } catch (err) {
        res.status(400).json({ message: "ERROR : " + err.message })
    }
}

// profile-update request handler
exports.profileUpdate = async (req, res) => {
    try {
        const loggedInUserId = req._id
        const requestBody = req.body
        const UPDATE_ALLOWED = ["firstName", "lastName", "age", "gender", "photoURL"]
        // for certain updates
        const isAllowed = Object.keys(requestBody).every(key => UPDATE_ALLOWED.includes(key))

        if (!isAllowed) {
            return res.status(400).json({ message: 'update not allowed' })
        }
        const updatedProfile = await userModel.findByIdAndUpdate(loggedInUserId, data, {
            runValidators: true,
            returnDocument: "after"
        })
        res.json({ message: 'user updated successfully', data: updatedProfile })
    } catch (err) {
        res.status(400).json({ message: 'update Failed : ' + err.message })
    }

}


// forget-password request handler
exports.forgetPassword = async (req, res) => {
    try {
        const loggedInUserId = req._id
        const newPassword = req.body.passWord
        if (!validator.isStrongPassword(newPassword)) {
            return res.status(400).json({ message: " It's not a strong password" })
        }
        const user = await userModel.findById(loggedInUserId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const passwordHash = await bcrypt.hash(newPassword, 10)

        await userModel.findByIdAndUpdate(loggedInUserId, { passWord: passwordHash })
        res.json({ message: "password has been updated" })

    } catch (error) {
        res.status(400).json({ message: "Error: " + error.message })
    }
} 