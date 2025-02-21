const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.getAllUsersData = async (req, res) => {
    try {
        const user = await userModel.find({})
        if (user.length === 0) {
            res.status(404).send('User data not found')
        } else {
            res.send(user)
        }
    } catch (err) {
        res.status(400).send('failed to get users data : ' + err.message)
    }
}
exports.getUserData = async (req, res) => {
    const id = req.params.id;                   // we are passing id in search params
    try {
        const user = await userModel.find({ _id: id })
        if (user.length === 0) {
            throw new Error('user not found')
        } else {
            res.send(user)
        }
    } catch (err) {
        res.status(400).send('failed to get user data :- ' + err.message)
    }
}

exports.updateUser = async (req, res) => {
    const userId = req.body.userId        // For an instance, we are giving id in payloadd
    const data = req.body
    try {
        const UPDATE_ALLOWED = ["gender", "photoURL", "userId"]
        // for certain updates
        const isAllowed = Object.keys(data).every(key => UPDATE_ALLOWED.includes(key))

        if (!isAllowed) {
            throw new Error('update not allowed')
        }
        const user = await userModel.findByIdAndUpdate(userId, data, {
            runValidators: true,
            returnDocument: "after"
        })
        res.send('user updated successfully')
    } catch (err) {
        res.status(400).send('update Failed : ' + err.message)
    }

}

exports.deleteUser = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await userModel.findByIdAndDelete(userId)
        res.send('user deleted successfully')
    } catch (err) {
        res.status(400).send('Delete failed : ', err.message)
    }

}

// user profile
exports.profile = async (req, res) => {
    try {
        const { token } = req.cookies
        if (!token) {
            throw new Error("token is not valid")
        }
        const decoded = jwt.verify(token, "DevTinder@123")
        const { _id } = decoded
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