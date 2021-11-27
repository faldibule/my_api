const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Post = require('../model/Post')

const authController = {
    register: async(req, res) => {
        try {

            const cekEmail = await User.findOne({email: req.body.email})
            if(cekEmail){
                return res.status(400).json({
                    message: "Email/Username Sudah Terdaftar"
                })
            }
            const cekUsername = await User.findOne({username: req.body.username})
            if(cekUsername){
                return res.status(400).json({
                    message: "Email/Username Sudah Terdaftar"
                })
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const data = {
                nama: req.body.nama,
                email: req.body.email,
                username: req.body.username,
                image: 'https://res.cloudinary.com/dte4zjcv2/image/upload/v1636268716/user/user_default_uij1dk.jpg',
                image_id: '',
                password: hashedPassword,
                role: 1
            }

            const save = await User.insertMany(data)
            if(save){
                res.status(200).json({
                    message: 'Berhasil Membuat Akun',
                })
            }else{
                res.status(400).json({
                    message: 'Gagal Registrasi'
                })
            }
        } catch (error) {
            console.log(error)
        }
    },

    login: async(req, res) => {
        try {
            const {email_username, password} = req.body
			let cek = '';
            if(email_username.includes('@')){
                cek = await User.findOne({email: email_username})
            }else{
                cek = await User.findOne({username: email_username})
            }
            if(cek){
                cekPassword = await bcrypt.compare(password, cek.password)
                if(cekPassword){
                    const expired = 30000
                    const token = await jwt.sign({id: cek._id}, process.env.SECRET, {
                        expiresIn: expired
                    })
                    res.status(200).json({
                        message: 'Berhasil Login',
                        data: cek,
                        token,
                        expired,
                    })
                }else{
                    res.status(403).json({
                        message: 'Pastikan Email/Username dan Password Sudah Benar!'
                    })
                }
            }else{
                res.status(403).json({
                    message: 'Pastikan Email/Username dan Password Sudah Benar!'
                })
            }
        } catch (error) {
            console.log(error)
        }
    },

    admin: async(req, res) => {
        console.log(req.auth)
        res.status(200).json({
            email: req.auth.id
        })
    },

    user: async(req, res) => {
        console.log(req.auth)
        res.status(200).json({
            email: req.auth.id
        })
    },

    getUser: async(req, res) => {
        try {
            const user = await User.find({username: req.body.username})
            console.log(user)
            res.status(200).json({
                message: 'Data User',
                user,
            })
        } catch (err) {
            console.log(err)
        }
    },

    editProfil: async(req, res) => {
        try {
            const userById = await User.findOne({_id: req.body.userId})
            console.log(userById)
            if(!req.body.isEmailSame){
                const userByEmail = await User.find({email: req.body.email})
                if(userByEmail){
                    return res.status(403).json({
                        message: 'Username/Email Sudah Terdaftar'
                    })
                }
            }
            if(!req.body.isUsernameSame){
                const userByUsername = await User.find({username: req.body.username})
                if(userByUsername){
                    return res.status(403).json({
                        message: 'Username/Email Sudah Terdaftar'
                    })
                }
            }
            
            
            const cekPassword = await bcrypt.compare(req.body.password, userById.password)
            if(cekPassword){
                const cek = await User.updateOne({_id: req.body.userId}, {
                    $set: {
                        nama: req.body.nama,
                        email: req.body.email,
                        username: req.body.username
                    }
                })
                if(cek){
                    return res.status(200).json({
                        message: 'Berhasil Mengubah Data Profil'
                    })
                }
            }else{
                return res.status(403).json({
                    message: 'Password Salah'
                })
            }
        } catch (err) {
            console.log(err)
        }
    },

    editPassword: async(req, res) => {
        try {
            const userById = await User.findOne({_id: req.body.userId})
            const cekPassword = await bcrypt.compare(req.body.password, userById.password)
            if(cekPassword){
                const hashedPassword = await bcrypt.hash(req.body.newPassword, 10)
                const cek = await User.updateOne({_id: req.body.userId}, {
                    $set:{
                        password: hashedPassword
                    }
                })
                if(cek){
                    res.status(200).json({
                        message: "Berhasil Mengganti Password"
                    })
                }else{
                    res.status(403).json({
                        message: "Gagal Ganti Password"
                    })
                }
            }else{
                res.status(403).json({
                    message: 'Password Salah'
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = authController