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

// connections
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

exports.feed = async (req, res) => {
    try {
        const loggedInUserId = req._id
        // find all connections where loggedInUserId is including in from and to
        const connectionRequests = await ConnectionRequestModel.find({
            $or: [{ fromUserId: loggedInUserId }, { toUserId: loggedInUserId }]
        }).select('fromUserId toUserId')

        // hide the user from feed where users alredy connected or ignored
        const hideUsersFromFeed = new Set()
        connectionRequests.forEach(req => {
            hideUsersFromFeed.add(req.toUserId.toString())
            hideUsersFromFeed.add(req.fromUserId.toString())
        })

        // finding users where there is no connection between to users and user itself
        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUserId } }
            ]
        }).select(USER_SAFE_DATA)
        res.json({ message: 'fetched the users', data: users })


    } catch (error) {
        res.status(400).json({ message: "ERROR: " + error.message })
    }

}