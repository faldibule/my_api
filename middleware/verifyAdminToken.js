const jwt = require('jsonwebtoken')

const verifyAdminToken = (req, res, next) =>{
    const role = req.body.role;
    const tokenBearer = req.headers.authorization
    if(tokenBearer){
        const token = tokenBearer.split(" ")[1]
        jwt.verify(token, process.env.SECRET, (err, decoded) =>{
            if(err){
                res.status(401).json({
                    message: 'Token Belum Terdaftar'
                })
            }else{
                if(role == 2){
                    req.auth = decoded
                    next()
                }else{
                    res.status(403).json({
                        message: 'Anda Tidak Diizinkan Masuk'
                    })
                }
            }
        })
    }    
}

module.exports = verifyAdminToken