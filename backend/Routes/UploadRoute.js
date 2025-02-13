const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");  
const { uploadFile } = require("../controllers/uploadController");  

// Route for handling file upload
router.post("/upload", upload.single("file"), uploadFile);  

module.exports = router;