import Form from "../models/FormModel.js";
import { v2 as cloudinary } from "cloudinary";

export const saveFormToDatabase = async (formData) => {
  const newForm = new Form(formData); 
  return await newForm.save(); 
};
