import Form from "../models/FormModel.js";
import { v2 as cloudinary } from 'cloudinary';

export const FormManager = async(name,email,file)=>{
    try{
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: 'forms',
          });
          const form = new Form({
            name,
            email,
            fileUrl: uploadResult.secure_url,
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