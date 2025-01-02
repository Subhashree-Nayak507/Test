// import Form from "../models/FormModel.js";
// import { v2 as cloudinary } from 'cloudinary';

// export const FormController= async(req,res)=>{
//     try{
//         const{ Name, email } = req.body;
//         const uploadResult = await cloudinary.uploader.upload(req.file.path, {
//             folder: "uploads", 
//         });

//         const fileUrl = uploadResult.secure_url;
//         const newForm = new Form({
//             Name,
//             email,
//             File:fileUrl
//         });
//         await newForm.save();
//         res.status(201).json({
//             message:"form submitted",
//             newForm
//         });
//     }catch(e){
//         console.log(e);
//     }
// };

import { uploadFileToCloudinary, saveFormToDatabase } from "../managers/FormManager.js";

export const FormController = async (req, res) => {
  try {
    const { Name, email } = req.body;

    // Upload file to Cloudinary
    const fileUrl = await uploadFileToCloudinary(req.file.path);

    // Prepare form data for saving
    const formData = {
      Name,
      email,
      File: fileUrl,
    };

    // Save form data to the database
    const newForm = await saveFormToDatabase(formData);

    // Send success response
    res.status(201).json({
      message: "Form submitted successfully",
      newForm,
    });
  } catch (e) {
    console.error("Error in FormController:", e);
    res.status(500).json({
      message: "An error occurred while submitting the form",
      error: e.message,
    });
  }
};
