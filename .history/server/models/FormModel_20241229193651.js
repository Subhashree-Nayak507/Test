import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

const User = mongoose.model("User",userSchema);
export default User;