const express = require('express');
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const requestRoutes = require('./routes/requestRoutes')


const app = express();  // Instance of express

app.use(express.json()) // middleware for converting JSON objects to JS objects
app.use(cookieParser())  // reading the cookies otherwise it'll throw undefined

app.use('/auth', authRoutes)  // only for auth
app.use('/user', userRoutes)  // only for user
app.use('/request', requestRoutes) // only for request

module.exports = app;