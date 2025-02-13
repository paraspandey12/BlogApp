const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
    cloud_name: "dc6oty1pn",
    api_key:'287724697383822',
    api_secret:"et68gFWUUGbiWVZTlXrBUZoH8PQ" ,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error("No file path provided to Cloudinary upload function.");
            return null;
        }

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",  // Automatically determine the file type (image, video, etc.)
        });

        // Log the Cloudinary response for debugging
        console.log("Cloudinary Upload Response:", response);

        // Cleanup the local file after upload
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);  // Log the error details
        if (localFilePath) fs.unlinkSync(localFilePath);  // Delete temp file if upload fails
        return null;
    }
};

module.exports = { uploadOnCloudinary };
