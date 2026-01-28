const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/db')
connectDB()
const router = require('./routes/user.routes')

app.use(cors())
app.use(express.json())

app.use('/',router)

app.listen(process.env.PORT,()=>{
    console.log('Server Starts');
})