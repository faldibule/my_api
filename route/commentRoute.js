const express = require('express')
const commentController = require('../controller/commentController')
const route = express.Router()
const methodOverride = require('method-override')

route.use(methodOverride('_method'))

route.post('/find', commentController.find)
route.post('/store', commentController.store)
route.delete('/delete', commentController.delete)

module.exports = route