const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    body: {
        type: String
    },
    image: {
        type: String,
    },
    image_id: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post