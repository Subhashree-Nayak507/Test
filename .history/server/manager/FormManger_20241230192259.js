import Form from "../models/FormModel.js";
import { v2 as cloudinary } from "cloudinary";

// Upload file to Cloudinary
export const uploadFileToCloudinary = async (filePath) => {
  const uploadResult = await cloudinary.uploader.upload(filePath, {
    folder: "uploads", // Cloudinary folder name
  });
  return uploadResult.secure_url; // Return the uploaded file URL
};

// Save form data to the database
export const saveFormToDatabase = async (formData) => {
  const newForm = new Form(formData); // Create a new Form document
  return await newForm.save(); // Save to the database and return the document
};
