import Form from "../models/FormModel.js";
import { v2 as cloudinary } from "cloudinary";


export const uploadFileToCloudinary = async (filePath) => {
  const uploadResult = await cloudinary.uploader.upload(filePath, {
    folder: "uploads", 
  });
  return uploadResult.secure_url; 
}

export const saveFormToDatabase = async (formData) => {
  const newForm = new Form(formData); 
  return await newForm.save(); 
};
