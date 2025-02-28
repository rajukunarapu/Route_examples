const { ConnectionRequestModel } = require('../models/requestConnections')
const User = require('../models/userModel')

const USER_SAFE_DATA = "firstName lastName age gender photoURL"

exports.recievedConnections = async (req, res) => {
    try {
        const loggedInUserId = req._id
        const requestConnections = await ConnectionRequestModel.find({
            toUserId: loggedInUserId,
            status: 'interested'
        }).populate('fromUserId', USER_SAFE_DATA)
        if (requestConnections.length === 0) {
            return res.status(404).json({ message: "No connections found" })
        }
        res.json({ message: "Fetched data successfully", data: requestConnections })
    } catch (error) {
        res.status(400).json({ message: "ERROR: " + error.message })
    }
}

exports.acceptedConnections = async (req, res) => {
    try {
        const loggedInUserId = req._id
        const userConnections = await ConnectionRequestModel.find({
            $or: [{ toUserId: loggedInUserId, status: "accepted" }, { fromUserId: loggedInUserId, status: 'accepted' }]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA)
        if (!userConnections) {
            return res.status(404).json({ message: "No connections found " })
        }
        // we get the connections by accepting their coonection request or accepting our connection request
        // if logged in user is from user, then we don't want our own profile and we get others profile
        const data = userConnections.map((obj) => {
            if (obj.fromUserId.equals(loggedInUserId)) {
                return obj.toUserId
            }
            return obj.fromUserId
        })
        res.json({ message: "fetched data successfull", "data": data })
    } catch (error) {
        res.status(400).json({ message: "ERROR: " + error.message })
    }
}

exports.usersFeed = async (req, res) => {
    try {
        const loggedInUserId = req._id
        const users = await User.find({ _id: { $ne: loggedInUserId } })
        if (!users) {
            return res.status(404).json({ message: "Users data not found" })
        }
        res.send({ message: "fetched data successfully", data: users })

    } catch (error) {
        res.status(400).json({ message: "ERROR: " + error.message })
    }

}