const { ConnectionRequestModel } = require("../models/requestConnections")
const User = require("../models/userModel")

// connection-requests handler
exports.connectionRequest = async (req, res) => {
    const fromUserId = req._id
    const toUserId = req.params.userId
    const status = req.params.status
    try {
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

        const newConnectionRequest = new ConnectionRequestModel({ fromUserId, toUserId, status })
        await newConnectionRequest.save();
        res.json({ message: `${fromUser.firstName} sent an ${status} request to ${toUser.firstName} `, data: newConnectionRequest })

    } catch (error) {
        res.status(400).json({ message: "Error: " + error.message })
    }
}