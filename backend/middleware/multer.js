const multer = require("multer");
const fs = require("fs");
const path = require("path");


const tempDir ="./public/temp";



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, tempDir);  
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
