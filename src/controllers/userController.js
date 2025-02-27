const { ConnectionRequestModel } = require('../models/requestConnections')
const User = require('../models/userModel')

exports.recievedConnections = async (req, res) => {
    try {
        const loggedInUserId = req._id
        const user = await User.findById(loggedInUserId)
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        const requestConnections = await ConnectionRequestModel.find({
            toUserId: loggedInUserId,
            status: 'interested'
        }).populate('toUserId', ['firstName', 'lastName']).populate('fromUserId', ['firstName', 'lastName'])
        if (requestConnections.length === 0) {
            return res.status(404).json({ message: "No connections found" })
        }
        res.json({ message: "Fetched data successfully", data: requestConnections })
    } catch (error) {
        res.status(400).json({ message: "ERROR: " + error.message })
    }
}

exports.usersFeed = async (req, res) => {
    try {
        const loggedInUserId = req._id
        const user = await User.findById(loggedInUserId)
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        const users = await User.find({ _id: { $ne: loggedInUserId } })
        if (!users) {
            return res.status(404).json({ message: "Users data not found" })
        }
        res.send({ message: "fetched data successfully", data: users })

    } catch (error) {
        res.status(400).json({ message: "ERROR: " + error.message })
    }

}