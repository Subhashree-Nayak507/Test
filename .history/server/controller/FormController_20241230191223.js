import Form from "../models/FormModel";
import { v2 as cloudinary } from 'cloudinary';

export const FormController= async(req,res)=>{
    try{
        const{ Name, email } = req.body;
        const fileUrl = await cloudinary.uploader.upload(req.file.path, {
            folder: 'uploads', // Optional: specify a folder in Cloudinary
          });
       ;
        const newForm = new Form({
            Name,
            email,
            File:fileUrl
        });
        await newForm.save();
        res.status(201).json({
            message:"form submitted"
        });
    }catch(e){
        console.log(e);
    }
};