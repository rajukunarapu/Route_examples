const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt')

// profile update
exports.profileUpdate = async (req, res) => {
    const _id = req._id
    const data = req.body
    try {
        const UPDATE_ALLOWED = ["firstName", "lastName", "age", "gender", "photoURL"]
        // for certain updates
        const isAllowed = Object.keys(data).every(key => UPDATE_ALLOWED.includes(key))

        if (!isAllowed) {
            throw new Error('update not allowed')
        }
        await userModel.findByIdAndUpdate(_id, data, {
            runValidators: true,
            returnDocument: "after"
        })
        res.send('user updated successfully')
    } catch (err) {
        res.status(400).send('update Failed : ' + err.message)
    }

}

// user profile
exports.profile = async (req, res) => {
    try {
        const _id = req._id
        const user = await userModel.findById(_id)
        if (!user) {
            throw new Error('user data not found')
        } else {
            res.send(user)
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
}

// forget password
exports.forgetPassword = async (req, res) => {
    const _id = req._id
    const newPassword = req.body.passWord
    try {
        if (!validator.isStrongPassword(newPassword)) {
            return res.status(400).json({ message: " It's not a strong password" })
        }
        const user = await userModel.findById(_id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const passwordHash = await bcrypt.hash(newPassword, 10)

        await userModel.findByIdAndUpdate(_id, { passWord: passwordHash })
        res.json({ message: "password has been updated" })

    } catch (error) {
        res.status(400).json({ message: "Error: " + error.message })
    }
} 