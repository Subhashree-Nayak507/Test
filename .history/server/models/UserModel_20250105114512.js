import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password:{
        type:String,
        required:true,
    }
},
{ timestamps:true}
);

const User = mongoose.model("User",UserSchema);
export default User;