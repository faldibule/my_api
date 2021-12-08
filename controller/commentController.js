const escapeHTML = require("escape-html")
const { comment } = require("../middleware/paginate")
const Comment = require("../model/Comment")

const commentController = {
    find: async(req, res) => {
        try {
            const currentPage = parseInt(req.body.page)
            const commentData = await comment(Comment, currentPage, 3, req.body.postId)
            res.status(200).json({
                message: 'Data Post',
                commentData
            })
            
        } catch (error) {
            console.log(error)
        }
    },

    store: async(req, res) => {
        try {
            const body = escapeHTML(req.body.body)
            const data = {
                body,
                user: req.body.userId,
                post: req.body.postId
            }
            const cek = await Comment.insertMany(data)
            if(cek){
                res.status(200).json({
                    message: 'Berhasil menambah komentar'
                })
            }else{
                res.status(403).json({
                    message: 'Gagal menambah komentar'
                })
            }
        } catch (error) {
            console.log(error)
        }
    },

    delete: async(req, res) => {
        try {
            const del = await Comment.deleteOne({_id: req.body.commentId})
            if(del){
                res.status(200).json({
                    message: "Berhasil Menghapus Comment"
                })
            }else{
                res.status(403).json({
                    message: "Gagal Menghapus Comment"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = commentController