const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: "{VALUE} is not a valid status "
        }
    }
}, {
    timestamps: true
})


const ConnectionRequestModel = mongoose.model("connectRequests", connectionRequestSchema)

module.exports = { ConnectionRequestModel }