const express = require('express')
const postController = require('../controller/postController')
const route = express.Router()
const upload = require('../middleware/multerConfig')

route.post('/store', upload.single('image'), postController.store)
route.post('/find', postController.find)
route.post('/detail', postController.detail)
route.delete('/delete/:id', postController.delete)

module.exports = route