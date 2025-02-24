const userModel = require('../models/userModel');
const { validateSignUpUser } = require('../utlis/validation')
const bcrypt = require('bcrypt')
const validator = require('validator')

exports.signUp = async (req, res) => {
    const { firstName, lastName, emailId, passWord } = req.body;
    try {
        //validation-data sanitization
        validateSignUpUser(req)
        // password hash
        const passwordHash = await bcrypt.hash(passWord, 10)   //salt is 10 for better encryption
        const user = new userModel({
            firstName, lastName, emailId, passWord: passwordHash
        });
        await user.save();
        res.send('signup successfull')
    } catch (err) {
        res.status(400).send('ERROR :' + err.message);
    }
}

exports.logIn = async (req, res) => {
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
        const validPassWord = await user.bcryptValidPassword(passWord)   //schema method
        if (validPassWord) {
            const token = await user.generateToken()   //schema method
            res.cookie('token', token, { expires: new Date(Date.now() + 8 * 3600000) })
            res.send("Login successfull")
        } else {
            throw new Error("Invalid user Credentials")
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }

}

exports.logOut = (req, res) => {
    res
        .cookie('token', null, { expires: new Date(Date.now()) })
        .send('logout successfull')

}
