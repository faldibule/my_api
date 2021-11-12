const multer = require("multer");
const path = require('path')

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, call) => {
    let ext = path.extname(file.originalname);
    if( ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
      req.file_error = 'Format tidak disupport'
      call(null, false)
    }
    call(null, true)
  }
})