const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
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

// It executes everytime before saving the documents into DB.
connectionRequestSchema.pre("save", function (next) {
    if (this.fromUserId.equals(this.toUserId)) {
        throw new Error("cannot send a connection request to yourself")
    }
    next()
})

connectionRequestSchema.index({ fromUserId: 1 }, { toUserId: 1 })

const ConnectionRequestModel = mongoose.model("connectRequests", connectionRequestSchema)

module.exports = { ConnectionRequestModel }