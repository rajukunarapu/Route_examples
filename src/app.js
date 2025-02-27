const express = require('express');
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const requestRoutes = require('./routes/requestRoutes')
const userRoutes = require('./routes/userRoutes')


const app = express();  // Instance of express

app.use(express.json()) // middleware for converting JSON objects to JS objects
app.use(cookieParser())  // reading the cookies otherwise it'll throw undefined

app.use('/auth', authRoutes)  // authentication
app.use('/profile', profileRoutes)  // profile view, updations
app.use('/request', requestRoutes) // request sending
app.use('/user', userRoutes)

module.exports = app;