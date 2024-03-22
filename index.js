import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";



dotenv.config({
  path: "./.env",
});



connectDB()
.then( () => {
    app.on("err",(error) => {
        console.log
    (`Mongodb connected successfully but express is not listening!! : ${error}`);
    throw error;
    })
    app.listen(process.env.PORT, ()=> {
console.log(`Hii my server is listening on this PORT : ${process.env.PORT}`)

    })
})
.catch((error) => {
    console.log(`Something error occured while connecting to mongodb : ${error}`)
})

