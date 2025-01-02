import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    File:{
        type:String,
        required:true,
    }
},
{ timestamps:true}
);

const Form = mongoose.model("Form",FormSchema);
export default Form;