const userModel = require('../models/userModel');
const { validateSinupUser } = require('../utlis/validation')
const bcrypt = require('bcrypt')
const validator = require('validator')

exports.signUp = async (req, res) => {
    const { firstName, lastName, emailId, passWord } = req.body;
    try {
        //validation
        validateSinupUser(req)
        // password hash
        const passwordHash = await bcrypt.hash(passWord, 10)   //salt is 10 for better encryption
        const user = new userModel({
            firstName, lastName, emailId, passWord: passwordHash
        });
        await user.save();
        res.send('user data successfully added')
    } catch (err) {
        res.status(400).send('ERROR :' + err.message);
    }
}

exports.login = async (req, res) => {
    const { emailId, passWord } = req.body;
    try {
        // validating emailId 
        const validateEmailId = validator.isEmail(emailId)
        if (!validateEmailId) {
            throw new Error("Enter a valid emailId")
        }
        // Finding the user based on emailId
        const user = await userModel.findOne({ emailId: emailId })
        if (!user) {
            throw new Error('Invalid user Credentials')
        }

        // comparing passwords
        const validPassWord = await bcrypt.compare(passWord, user.passWord)
        if (!validPassWord) {
            throw new Error("Invalid user Credentials")
        } else {
            res.send("Login successfull")
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }

}

