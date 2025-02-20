const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        trim: true
    },
    lastName: {
        type: String,
        minLength: 4,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    passWord: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new error('gender type is not valid')
            }
        }
    },
    photoURL: {
        type: String,
        default: "https://www.flaticon.com/free-icon/user_149071"
    }
},
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;