const userModel = require('../models/userModel')

exports.getUserData = async (req, res) => {
    const { emailId } = req.body;
    try {
        const user = await userModel.find({ emailId: emailId })
        if (user.length === 0) {
            res.status(404).send('User data not found')
        } else {
            res.send(user)
        }
    } catch (err) {
        res.status(500).send('Something went wrong :- ' + err.message)
    }
}