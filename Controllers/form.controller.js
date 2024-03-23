import { Form } from "../models/Form.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const fillingForm = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const { formId, action } = req.query;
    const form = await Form.findById(formId);
  
    if (!form) {
      throw new ApiError(404, "Form not found");
    }
  
    // Perform actions based on the query parameter 'action'
    switch (action.toLowerCase()) {
        case "fill":
            if (!title || !description || !req.file) {
              throw new ApiError(404, "title, description, and image are required for filling a form");
            }
            const result = await uploadOnCloudinary(req.file.path);
            form.filledBy.push({
              userId: req.user.id,
              title,
              description,
              image: result.secure_url,
              date: new Date(),
            });
            
        break;
  
      case "update":
        if (!title && !description) {
          throw new ApiError(404, "At least one of title or description should be provided for updating a form");
        }
        form.title = title || form.title;
        form.description = description || form.description;
        break;
  
      case "delete":
        // Implement form deletion logic here
        await form.remove();
        break;
  
      default:
        throw new ApiError(404, "Invalid action specified. Supported actions: fill, update, delete");
    }
  
    await form.save();
    res.status(200).json(new ApiResponse(form, "Form updated successfully"));
  });




export {fillingForm}











// const fillingForm = asyncHandler(async(req,res) => {
//     const { title, description } = req.body;
//     const  formData = new Form({title,description});
//     if (req.file){
//         let result= await uploadOnCloudinary(req.file);
//         if(!result){throw new ApiError(400,"Image Upload Failed")};
//         formData.image = result.url
//         };
//         const savedForm = await formData.save();
//         res.status(201).json(new ApiResponse(201,savedForm,"form filled successfully"))
// })
