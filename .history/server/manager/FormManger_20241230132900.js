import Form from "../models/FormModel.js";
import { v2 as cloudinary } from 'cloudinary';

export const FormManager = async(req,res)=>{
    try{
        const uploadResult = await cloudinary.uploader.upload(file.path, 
          {
          resource_type: 'auto' 
        });
          const form = new Form({
            Name,
            email,
            File: uploadResult.secure_url,
          });
          await form.save(); 
          res.status(201).json({
            success:true,
            message:"file saved"
        });       
    }catch(e){
        console.log("Error",e);
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        });
     }
}