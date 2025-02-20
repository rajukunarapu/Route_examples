const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();  // Instance of express
app.use(express.json()) // middleware for converting JSON objects to JS objects


app.use('/auth', authRoutes)  // only for auth
app.use('/user', userRoutes)  // only for user

module.exports = app;