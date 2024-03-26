import { Router } from "express";
import { fillForm } from "../Controllers/form.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/fill-form").post(
  upload.single("image"), // Corrected to use single field name
  fillForm
);

export default router;
