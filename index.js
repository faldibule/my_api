const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const authRoute = require('./route/authRoute')
const postRoute = require('./route/postRoute')
const cors = require('cors')
require('./utils/db')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get('/', (req, res) => {
    res.json({message: 'Halaman Utama'})
})

app.use('/v1/auth', authRoute)
app.use('/v1/post', postRoute)


app.listen(port, () => {
    console.log(`Connected to ${port}`)
})