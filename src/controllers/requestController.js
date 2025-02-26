const { ConnectionRequestModel } = require("../models/requestConnections")
const User = require("../models/userModel")

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
            return res.status(400).json({ message: 'connection alredy sent' })
        }
        // prevent the request to ourself
        if (fromUserId === toUserId) {
            return res.status(400).json({ message: "Can't send request to ourself" })
        }

        const newConnectionRequest = new ConnectionRequestModel({ fromUserId, toUserId, status })
        await newConnectionRequest.save();
        res.json({ message: `${fromUser.firstName} has sent a connection to ${toUser.firstName} ` })

    } catch (error) {
        res.status(400).json({ message: "Error: " + error.message })
    }
}