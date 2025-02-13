const {uploadOnCloudinary}= require("../utils/cloudinary")


const uploadFile= async(req,res)=>{
  try {
     if(!req.file){
        return res.status(400).send({message:"no file uploaded"})
     }

     const uploadedFile= await uploadOnCloudinary(req.file.path)

     if(uploadedFile){
        res.status(200).json({
            message: "file uploaded successfully",
            fileUrl:uploadedFile.url
        })
     }
     else{
        res.status(500).send({ message: "Error uploading file to Cloudinary" });
     }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
}

module.exports={
    uploadFile
}