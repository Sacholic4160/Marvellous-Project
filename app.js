import mongoose from "mongoose";
import  express  from "express";
import {Form} from "./models/Form.model.js"
import cors from "cors"


const app =  express();

app.use(
cors({
   origin: process.env.CORS_ORIGIN ,
   Credential : true,
})
)

import formRouter from "./Routes/form.route.js"

app.use("/api/v1/form", formRouter)



export {app}