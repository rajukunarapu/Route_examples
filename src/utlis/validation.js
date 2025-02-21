const validator = require('validator');

const validateSinupUser = (req) => {
    const { firstName, lastName, emailId, passWord } = req.body;
    if (!firstName || !lastName) {
        throw new Error('name is not valid')
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error('Enter a valid email')
    }
    else if (!validator.isStrongPassword(passWord)) {
        throw new Error('Enter strong password')
    }
}

module.exports = { validateSinupUser }