import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";
import exp from "constants";

cloudinary.config({
  cloud_name: "dpox4drsw",
  api_key: "654613913124377",
  api_secret: "1OAEFB8DF2dWrHRxItcSBsiOnbk",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    //check here the file path is valid , correct or not!!
    if (!localFilePath) {
      throw new ApiError(404, "Invalid File Path");
    }

    //upload it on cloudinary!!
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", //the upload method here consist of many options we can write here as one of them is the type of our file
    });
    console.log(`File have been uploaded to cloudinary : ${response.url}`);

    //now though file is uploaded we can remove it from local machine!!
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
      console.log("File has been deleted");
    } else { 
      console.error("Failed to delete local")
    }
    return response;
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
      console.log("File has been deleted");
    } else { 
      console.error("Failed to delete local")
    }
    console.log("Error in uploading image on Cloudinary ", error);

    return null;
  }
};

export { uploadOnCloudinary };
