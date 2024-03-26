import { Form } from "../models/Form.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

const fillForm = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const imgLocalPath = req.file?.path; // Access the uploaded file using req.file

  console.log(imgLocalPath);

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
  console.log(image);
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
  console.log(form);
  if (!form) {
    throw new ApiError(404, "there is some error while creating the form!");
  }

  await form.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, form, "The form has been created successfully!")
    );
});

//function for getting all form details
const getFormDetails = asyncHandler(async (req, res) => {

  const  _id = req.params.formId
  //checking whether the given  formId exists or not
  if (!_id) {
    throw new ApiError(
      404,
      "Invalid form id OR form Id is missing in the request"
    );
  }

  const form = await Form.findById({_id}) //: req.params.formId});
  console.log(form);

  return res
    .status(200)
    .json(new ApiResponse(201, form, "Form Details fetched Successfully"));
});

const updateForm = asyncHandler(async (req, res) => {
  // const { title, description } = req.body;
  // const _id = req.params.formId;

  // Check if a file was uploaded
  let image = {};
  if (req.file) {
    const imgLocalPath = req.file.path;
    image = await uploadOnCloudinary(imgLocalPath);
  }

  // if (!_id) {
  //   throw new ApiError(404, "Invalid form id OR formId is required!");
  // }

  // Convert _id to ObjectId if necessary


  const form = await Form.findByIdAndUpdate(
  {_id : req.params.formId},
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        image: req.file ? image.url : undefined, // Update image only if a file was uploaded
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(201, form, "Form details updated successfully!"));
});



//function for deleting form details
const deleteFormDetails = asyncHandler(async (req, res) => {
  const  _id = req.params.formId; //here we cannnot destructure the _id 

  if (!_id) {
    throw new ApiError(400, "please provide a valid form Id");
  }

  const form = await Form.findByIdAndDelete({_id});
  return res
    .status(200)
    .json(
      new ApiResponse(200, form, "The form has been deleted  succesfully!")
    );
});
export { fillForm, updateForm, getFormDetails, deleteFormDetails };
