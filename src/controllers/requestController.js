const { ConnectionRequestModel } = require("../models/requestConnections")
const User = require("../models/userModel")

// connection-requests handler
exports.sendingConnectionRequest = async (req, res) => {
    try {
        const fromUserId = req._id
        const toUserId = req.params.userId
        const status = req.params.status
        const allowedStatus = ["interested", "ignored"].includes(status)
        if (!allowedStatus) {
            return res.status(400).json({ message: "Invalid status type" })
        }
        const toUser = await User.findById(toUserId)
        const fromUser = await User.findById(fromUserId)
        if (!toUser || !fromUser) {
            return res.status(404).json({ message: "User not found" })
        }

        // preventing connection collision
        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or: [{ fromUserId, toUserId }, { fromUserId: toUserId, toUserId: fromUserId }]
        })
        if (existingConnectionRequest) {
            return res.status(400).json({ message: 'connection request already sent' })
        }

        const newConnectionRequest = await new ConnectionRequestModel({ fromUserId, toUserId, status })
        await newConnectionRequest.save();
        await newConnectionRequest.populate("fromUserId", ["firstName", "lastName"]);
        await newConnectionRequest.populate("toUserId", ["firstName", "lastName"]);
        res.json({ message: `${fromUser.firstName} sent an ${status} request to ${toUser.firstName} `, data: newConnectionRequest })

    } catch (error) {
        res.status(400).json({ message: "Error: " + error.message })
    }
}

// review connection-request handler
exports.reviewConnectionRequest = async (req, res) => {
    try {
        const { requestId, status } = req.params
        const loggedInUserId = req._id
        const allowedStatus = ["accepted", "rejected"].includes(status)
        if (!allowedStatus) {
            return res.status(400).json({ message: "It's not a valid status type" })
        }
        if (!loggedInUserId) {
            return res.status(404).json({ message: "User not found" })
        }
        const connectionRequestObject = await ConnectionRequestModel.findOne({
            _id: requestId,
            toUserId: loggedInUserId,
            status: "interested"
        }).populate('fromUserId', ["firstName", "lastName"]).populate('toUserId', ["firstName", "lastName"])
        if (!connectionRequestObject) {
            return res.status(404).json({ message: "Connection request not found" })
        }
        connectionRequestObject.status = status
        const data = await connectionRequestObject.save()
        res.json({ message: `${connectionRequestObject.toUserId.firstName} ${status} the connection request of ${connectionRequestObject.fromUserId.firstName} `, data })

    } catch (error) {
        res.status(400).json({ message: "ERROR: " + error.message })
    }

}