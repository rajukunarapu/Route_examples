const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser')


const app = express();  // Instance of express
app.use(express.json()) // middleware for converting JSON objects to JS objects
app.use(cookieParser())  // reading the cookies otherwise it will encounter undefined

app.use('/auth', authRoutes)  // only for auth
app.use('/user', userRoutes)  // only for user

module.exports = app;