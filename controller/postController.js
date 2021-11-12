const Post = require("../model/Post")
const cloudinary = require('../utils/cloudinary')
const { home } = require('../middleware/paginate')
const escapeHTML = require("escape-html")
const moment = require('moment')

const postController = {
    find: async(req, res) =>{
        try{
            const currentPage = parseInt(req.body.page)
            const posts = await home(Post, currentPage, 3)
            res.status(200).json({
                message: 'Data Post',
                posts
            })
        }catch(err){
            console.log(err)
        }
    },

    detail: async(req, res) =>{
        try {
            const post = await Post.find({_id: req.body.postId}).populate({path: 'user', select: ['email', 'nama', 'username', 'image']});
            res.status(200).json({
                message: 'Data Detail',
                post
            })
        } catch (err) {
            console.log(err)
        }
    },

    store: async(req, res) => {
        if(typeof req.file_error !== 'undefined'){
            return res.status(403).json({
                message: req.file_error,
            })
        }
        try {
            let image = ''
            let image_id = ''
			console.log(req.file);
            if(req.file){
                const upload = await cloudinary.uploader.upload(req.file.path, {folder: 'post'})
                image = upload.secure_url
                image_id = upload.public_id
            }
            const body = escapeHTML(req.body.body)
            const data = {
                body,
                image,
                image_id,
                createdAt: Date.now(),
                user: req.body.userId
            }
            console.log(data)
            const cek = await Post.insertMany(data)
            if(cek){
                res.status(201).json({
                    message: "Berhasil Post"
                })
            }
        } catch (err) {
            console.log(err)
        }
    },

    delete: async(req, res) => {
        try {
            const post = await Post.findOne({_id: req.params.id})
            if(post.image !== '' && post.image_id !== '' ){
                await cloudinary.uploader.destroy(post.image_id)
                await Post.deleteMany({_id: req.params.id})
            }
            res.status(200).json({
                message: "berhasil delete"
            })
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = postController