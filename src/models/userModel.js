const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 10,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 10,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Enter a valid email')
            }
        }
    },
    passWord: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Enter a strong password')
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error('gender type is not valid')
            }
        }
    },
    photoURL: {
        type: String,
        default: "https://www.flaticon.com/free-icon/user_149071",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('Enter a valid image path')
            }
        }
    }
},
    {
        timestamps: true
    }
);

//Instance methods
userSchema.methods.generateToken = async function () {
    const token = await jwt.sign({ _id: this._id }, `${process.env.JWT_SECRETE}`, { expiresIn: '7d' })
    return token
}

userSchema.methods.bcryptValidPassword = async function (password) {
    const validPassword = await bcrypt.compare(password, this.passWord)
    return validPassword
}

const User = mongoose.model("User", userSchema);
module.exports = User;