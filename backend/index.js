const express= require("express")
const mongoose= require("mongoose")
const cors= require("cors")
const dotenv= require("dotenv")
const userRoute= require("./Routes/authRoute")
const uploadRoute=require("./Routes/UploadRoute")
const blogRoute= require("./Routes/blogRoute")
const cookieParser= require("cookie-parser")



const app= express()
app.use(express.json())
const corsOption={
   origin:"http://localhost:5173",
   methods:"GET,POST,PUT,DELETE",
   credentials:true,

}
app.use(cors(corsOption))
app.use(cookieParser())

 
dotenv.config()
app.use("/api",userRoute)
app.use("/api",uploadRoute)
app.use("/api",blogRoute)


mongoose.connect('mongodb://127.0.0.1:27017/blogApp')
.then(()=>console.log("connection successfull"))
.catch(err=>console.log("error connection:", err))

app.get("/", (req, res)=>{
   res.send("hello")
   
})
const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
  })