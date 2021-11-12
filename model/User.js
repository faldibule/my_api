const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    nama:{
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    image: {
        type: String
    },
    image_id: {
        type: String
    },
    role: {
        type: String
    },
})

const User = mongoose.model('User', userSchema)

module.exports = User