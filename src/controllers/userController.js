const userModel = require('../models/userModel')

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
            res.status(404).send('User data not found')
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
        const user = await userModel.findByIdAndUpdate(userId, data, {
            runValidators: true,
            returnDocument: "after"
        })
        res.send('updated user successfully')
    } catch (err) {
        res.status(400).send('update Failed : ' + err.message)
    }

}

exports.deleteUser = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await userModel.findByIdAndDelete(userId)
        res.send('deleted user successfully')
    } catch (err) {
        res.status(400).send('Delete user failed : ', err.message)
    }

}
