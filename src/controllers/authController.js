const userModel = require('../models/userModel');
const { validateSinupUser } = require('../utlis/validation')
const bcrypt = require('bcrypt')
const validator = require('validator')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

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
        const validPassWord = await user.bcryptValidPassword(passWord)
        if (validPassWord) {
            const token = await user.generateToken()
            res.cookie('token', token)
            res.send("Login successfull")
        } else {
            throw new Error("Invalid user Credentials")
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }

}

