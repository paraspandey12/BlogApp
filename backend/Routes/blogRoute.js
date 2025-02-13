const express=require("express")
const router= express.Router()
const authenticateUser=require("../middleware/authenticateUser")
const BlogController = require("../controllers/blogController")

router.post("/createBlog",authenticateUser, BlogController.createBlog)
router.get("/getBlog", BlogController.getPosts)
router.get("/getLatest", BlogController.getLatest)
router.get("/getTrendingBlog", BlogController.getTrendingBlogs)
router.post("/searchBlog", BlogController.searchBlog)




module.exports= router