 const express= require("express")
 const router= express.Router()
 const userController= require('../controllers/userController')
const authenticateUser = require("../middleware/authenticateUser")

 router.post("/register",userController.createUser)
 router.post("/login",userController.login)
 router.get("/users",authenticateUser,userController.getUsers)
 router.put("/update",authenticateUser,userController.updateUser);


 module.exports= router;