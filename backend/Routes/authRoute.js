 const express= require("express")
 const router= express.Router()
 const userController= require('../controllers/userController')

 router.post("/register",userController.createUser)
 router.post("/login",userController.login)
 router.get("/users",userController.getUsers)


 module.exports= router;