import mongoose,{Schema} from "mongoose";


const formSchema =  new Schema({
    title:{
        type:String,
        required:true,
        
    },
    description:{
        type: String,
        required:true
    },
    image:{
        type: String,    // we will upload it on  cloudinary!!
        required:false
    }
},{timestamps:true})



export const Form = mongoose.model("Form", formSchema);