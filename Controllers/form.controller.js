import { Form } from "../models/Form.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
//import mongoose from "mongoose";

// const fillForm = asyncHandler(async (req, res,next) => {
  

//   try {

//     const { title, description, mobile } = req.body;
//     console.log(title,description,mobile);
//     // Check for title and description
//     if (!(title && description)) {
//       //throw new ApiError(400, "Please provide both title and description");
//       throw new Error("Please provide both title and description")

//     }

//     // Check for valid mobile number
//    if (!/^[0-9]{10}$/.test(mobile)) {
//       throw new Error("Phone Number should be a 10-digit number");
//      //throw new Error("Phone Number should be a 10-digit number")
//     } else if (mobile == "") {
//       throw new Error("Phone field cannot be empty");
//     } else if (mobile.length !== 10) {
//       throw new Error( "Phone Number must be a 10-digit number!");
//     } else if (mobile[0] !== "9" && mobile[0] !== "8" && mobile[0] !== "7") {
//       throw new Error( "Phone number should start with 9, 8, or 7");
//     } 

//     const imgLocalPath = req.file?.path;
//     if (!imgLocalPath) {
//       throw new Error(
//         "Image Local Path is required! There was an issue while uploading the image to the local storage."
//       );
//     }

//     const image = await uploadOnCloudinary(imgLocalPath);
//     if (!image) {
//       throw new Error("Error uploading the image file to Cloudinary.");
   
//     }

//     const form = new Form({
//       title,
//       description,
//       image: image.url,
//       mobile,
//     });

//     if (!form) {
//       throw new Error( "Failed to create the form.");
//     }

//     // Check if a form with the same title already exists
//     const existedForm = await Form.findOne({ title });
//     if (existedForm) {
//       // Pass the error to the next middleware in the chain
//       //next(new ApiError(400, "Form with this title already exists"));
//       throw new Error("Form with this title already exist!!");
//     } else {
//       await form.save();
//     }
 
//    // await form.save();
//     return res
//       .status(201) // Use 201 for successfully created resources
//       .json(new ApiResponse(201, form, "Form creation successful!"));
//   } catch (error) {
//     // Handle the error and prevent the data from being saved
//     console.error(error);
//     next(error);
//   }
// });

const fillForm = asyncHandler(async (req, res, next) => {
  try {
    const { title, description, mobile } = req.body;
    console.log(title, description, mobile);

    // Check for title and description
    if (!(title && description)) {
      throw new ApiError(400, "Please provide both title and description");
    }

    // Check for valid mobile number
    if (mobile == "") {
      throw new ApiError(400, "Phone field cannot be empty", [], null, "validation");
    } else if (mobile.length !== 10) {
      throw new ApiError(400, "Phone Number must be a 10-digit number!");
    } else if (mobile[0] !== "9" && mobile[0] !== "8" && mobile[0] !== "7") {
      throw new ApiError(400, "Phone number should start with 9, 8, or 7");
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      throw new ApiError(400, "Invalid Phone Number!");
    }

    const imgLocalPath = req.file?.path;
    if (!imgLocalPath) {
      throw new ApiError(400, "Image Local Path is required! There was an issue while uploading the image to the local storage.");
    }

    const image = await uploadOnCloudinary(imgLocalPath);
    if (!image) {
      throw new ApiError(400, "Error uploading the image file to Cloudinary.");
    }

    const form = new Form({
      title,
      description,
      image: image.url,
      mobile,
    });

    if (!form) {
      throw new ApiError(400, "Failed to create the form.");
    }

    // Check if a form with the same title already exists
    const existedForm = await Form.findOne({ title });
    if (existedForm) {
      throw new ApiError(400, "Form with this title already exists.");
    } else {
      await form.save();
    }

    return res
      .status(201) // Use 201 for successfully created resources
      .json(new ApiResponse(201, form, "Form creation successful!"));
  } catch (error) {
    // Handle the error and prevent the data from being saved
    console.error(error);
    next(error);
  }
});
//function for getting all form details
const getFormDetails = asyncHandler(async (req, res) => {
try {
    const _id = req.params.formId;
    //checking whether the given  formId exists or not
    if (!_id) {
      throw new ApiError(
        400,
        "Invalid form id OR form Id is missing in the request"
      );
    }
  
    const form = await Form.findById({ _id }); //: req.params.formId});
    console.log(form);
  
    return res
      .status(200)
      .json(new ApiResponse(201, form, "Form Details fetched Successfully"));
} catch (error) {
  console.log(`some error occured : ${error}`);
}
});

const updateForm = asyncHandler(async (req, res) => {
 try {
   const { title, description ,mobile } = req.body;
   // const _id = req.params.formId;
    
 // Check for valid mobile number
 if (mobile == "") {
  throw new ApiError(400, "Phone field cannot be empty", [], null, "validation");
} else if (mobile.length !== 10) {
  throw new ApiError(400, "Phone Number must be a 10-digit number!");
} else if (mobile[0] !== "9" && mobile[0] !== "8" && mobile[0] !== "7") {
  throw new ApiError(400, "Phone number should start with 9, 8, or 7");
} else if (!/^[0-9]{10}$/.test(mobile)) {
  throw new ApiError(400, "Invalid Phone Number!");
}


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
 
   //check by title if same title form is exist or not!!
   const existedForm = await  Form.findOne({title});
   if (existedForm ) {  //&& existedForm._id != req.params.formId
     throw new ApiError(409, `A form with this title already exists.`);
   }
 
   const form = await Form.findByIdAndUpdate(
     { _id: req.params.formId },
     {
       $set: {
 
         title,//req.body.title,
         description,// req.body.description,
         image: req.file ? image.url : undefined, // Update image only if a file was uploaded
         mobile,  //req.body.mobile
       },
     },
     { new: true }
   );
 
   return res
     .status(200)
     .json(new ApiResponse(201, form, "Form details updated successfully!"));
 } catch (error) {
  console.log(`some error occured : ${error}`);
 }
});

//function for deleting form details
const deleteFormDetails = asyncHandler(async (req, res) => {
 try {
   const _id = req.params.formId; //here we cannnot destructure the _id
 
   if (!_id) {
     throw new ApiError(400, "please provide a valid form Id");
   }
 
   const form = await Form.findByIdAndDelete({ _id });
   return res
     .status(200)
     .json(
       new ApiResponse(200, form, "The form has been deleted  succesfully!")
     );
 } catch (error) {
  console.log(`some error occured : ${error}`);
 }
});

const getAllForm = asyncHandler(async (req, res) => {
 try {
   const form = await Form.find();
 
   return res
     .status(200)
     .json(new ApiResponse(200, form, "Forms fetched Successfully"));
 } catch (error) {
  console.log(`some error occured : ${error}`);
 }
});

// function phonenumber(inputtxt) {
//   var phoneno = /^\d{10}$/;
//   if((inputtxt.value.match(phoneno)) {
//       return true;
//         } else {
//         alert("message");
//         return false;
//         }

// const fillFormNew = asyncHandler((req, res) => {
//   //   const { title, description, mobile } = req.body;
//   //   if (!title) {
//   //     throw new ApiError(400, "Please provide the title!");
//   //   }
//   //   if (!description) {
//   //     throw new ApiError(400, "Please provide the description!");
//   //   }
//   //   if (!mobile) {
//   //     throw new ApiError(400, "Please provide the Phone Number!");
//   //   }
//   //   if (mobile.length !== 10) {
//   //     throw new ApiError(400, "Phone Number should be of 10 digits");
//   //   }
//   //   if (!/^[0-9]{10}$/.test(mobile)) {
//   //     throw new ApiError(400, "Invalid Phone Number Format!");
//   //   }
//   //    res.json({code: 200, data: "hello"})
// });

export {
  fillForm,
  updateForm,
  getFormDetails,
  deleteFormDetails,
  getAllForm,
 // fillFormNew,
};
