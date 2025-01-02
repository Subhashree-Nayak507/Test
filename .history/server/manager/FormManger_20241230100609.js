import Form from "../models/FormModel";
import cloudinary from "../utils/cloudinary.js";

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
          return await form.save();        
    }catch(e){
        console.log("Error",e);
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        });
     }
}