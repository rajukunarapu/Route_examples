require('dotenv').config()
const app = require('./app')
const connectDB = require('./config/db')

connectDB()
    .then(() => {
        console.log('connected DB successfully')
        app.listen(process.env.PORT, () => console.log(`server running on ${process.env.PORT} port`))
    })
    .catch((err) => {
        console.log('DB not connected :', err.message)
    })

