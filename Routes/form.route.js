import { Router } from "express";
import { fillingForm } from "../Controllers/form.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/fill-form").post(
  upload.single([
    {
      name: "image",
      maxCount: 1, //we only accept one image per
    },
  ]),
  fillingForm
);

export default router;
