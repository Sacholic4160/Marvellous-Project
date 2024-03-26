import { Form } from "../models/Form.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const fillForm = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const imgLocalPath = req.file?.path; // Access the uploaded file using req.file

   console.log(imgLocalPath)
   
  if (!(title && description)) {
    throw new ApiError(404, "title and description both are required!!");
  }

  if (!imgLocalPath) {
    throw new ApiError(
      400,
      "Image Local Path is required!! , there is some problem while uploading image to local storage"
    );
  }

  const image = await uploadOnCloudinary(imgLocalPath);
console.log(image)
  if (!image) {
    throw new ApiError(
      400,
      "Problem in uploading the image file on cloudinary"
    );
  }

  const form = new Form({
    // title: req.body.title,
    // description: req.body.description,
    title,
    description,
    image: image.url,
  });
 console.log(form)
  if (!form) {
    throw new ApiError(404, "there is some error while creating the form!");
  }

  await form.save();


  return res
  .status(200)
  .json(
    new ApiResponse(200 , form , "The form has been created successfully!")
  )
});



export {fillForm,}