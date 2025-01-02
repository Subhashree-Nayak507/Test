import Form from "../models/FormModel.js";
import { v2 as cloudinary } from 'cloudinary';

export const FormController= async(req,res)=>{
    try{
        const{ Name, email } = req.body;
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: "uploads", // Optional: specify a folder in Cloudinary
        });

        const fileUrl = uploadResult.secure_url; // Extract the secure URL
        const newForm = new Form({
            Name,
            email,
            File:fileUrl
        });
        await newForm.save();
        res.status(201).json({
            message:"form submitted",
            newForm
        });
    }catch(e){
        console.log(e);
    }
};