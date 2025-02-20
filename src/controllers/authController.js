const userModel = require('../models/userModel');

exports.postUserData = async (req, res) => {
    const data = req.body;
    try {
        const user = new userModel(data);
        await user.save();
        res.send('user data successfully added')
    } catch (err) {
        res.status(500).send('Data not stored :' + err.message);
    }
}

