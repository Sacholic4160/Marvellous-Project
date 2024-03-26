import mongoose from "mongoose";
import  express  from "express";
import {Form} from "./models/Form.model.js"
import cors from "cors"
import bodyParser from "body-parser";
import multer from "multer";


const app =  express();

app.use(
cors({
   origin: process.env.CORS_ORIGIN ,
   Credential : true,
})
)
//app.use(multer().single('file'));

//use body parser for destructuring 
//const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import formRouter from "./Routes/form.route.js"

app.use("/api/v1/form", formRouter)



export {app}