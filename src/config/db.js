const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://rajukunarapu:VNK320KZmpfMf2Xm@namasthenode.p4cvc.mongodb.net/devTinder')
}

module.exports = connectDB;

