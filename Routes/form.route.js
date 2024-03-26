import { Router } from "express";
import { fillForm,updateForm, getFormDetails, deleteFormDetails,getAllForm } from "../Controllers/form.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

//route for filling a form
router.route("/fill-form").post(
  upload.single("image"), // Corrected to use single field name
  fillForm
);
//route for getting all form details
router.route("/getAllDetails").get(getAllForm)

//route for getting form details
 router.route("/get-details/:formId").get(getFormDetails)

//route for updating a form
router.route("/update-form/:formId").put(upload.single("image"),updateForm)

//route for deleting form details 
router.route("/delete-form/:formId").delete(deleteFormDetails)



export default router;
