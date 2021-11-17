const express = require('express')
const route = express.Router()
const authController = require('../controller/authController')
const verifyAdminToken = require('../middleware/verifyAdminToken')
const verifyUserToken = require('../middleware/verifyUserToken')

route.post('/admin', verifyAdminToken, authController.admin)
route.post('/user', verifyUserToken, authController.user)
route.post('/login', authController.login)
route.post('/register', authController.register)
route.post('/profil', authController.getUser)

module.exports = route