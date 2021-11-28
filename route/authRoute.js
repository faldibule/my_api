const express = require('express')
const route = express.Router()
const authController = require('../controller/authController')
const verifyAdminToken = require('../middleware/verifyAdminToken')
const verifyUserToken = require('../middleware/verifyUserToken')
const upload = require('../middleware/multerConfig')

route.post('/admin', verifyAdminToken, authController.admin)
route.post('/user', verifyUserToken, authController.user)
route.post('/login', authController.login)
route.post('/register', authController.register)
route.post('/profil', authController.getUser)
route.post('/edit_profil', authController.editProfil)
route.post('/edit_password', authController.editPassword)
route.post('/edit_foto_profil', upload.single('image'), authController.editFoto)

module.exports = route