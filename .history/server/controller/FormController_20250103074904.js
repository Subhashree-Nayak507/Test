import { uploadFileToCloudinary, saveFormToDatabase } from "../manager/FormManger.js";

export const FormController = async (req, res) => {
  try {
    const { Name, email } = req.body;
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const fileUrl = await uploadFileToCloudinary(req.file.path);
    const formData = {
      Name,
      email,
      File: fileUrl,
    };

    const newForm = await saveFormToDatabase(formData);

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
