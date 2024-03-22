import { Form } from "../models/Form.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";



const fillingForm  = asyncHandler(async (req,res) => {
    const { title , description } = req.body
    const { }

    //check if title or description is valid or correct or not!!
    if(!title && !description){
        throw new ApiError(404,"title and description are required!!")
    }

    const form = await Form.findByIdAndUpdate()
})







// const fillingForm  = asyncHandler(async (req,res) => {
//     const { title , description } = req.body
//     const { formId, action } = req.query;
//     const form = await Form.findById(formId);

//     if (!form) {
//       throw new ApiError(404, "Form not found");
//     }

//     // Perform actions based on the query parameter 'action'
//     switch (action.toLowerCase()) {
//       case "fill":
//         if (!title || !description) {
//           throw new ApiError(404, "title and description are required for filling a form");
//         }
//         form.filledBy.push({
//           userId: req.user.id,
//           title,
//           description,
//           date: new Date(),
//         });
//         break;

//       case "update":
//         if (!title && !description) {
//           throw new ApiError(404, "At least one of title or description should be provided for updating a form");
//         }
//         form.title = title || form.title;
//         form.description = description || form.description;
//         break;

//       case "delete":
//         // Implement form deletion logic here
//         break;

//       default:
//         throw new ApiError(404, "Invalid action specified. Supported actions: fill, update, delete");
//     }

//     await form.save();
//     res.status(200).json(new ApiResponse(form, "Form updated successfully"));
// });
