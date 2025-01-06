import { uploadFileToCloudinary, saveFormToDatabase } from "../manager/FormManger.js";
import Form from "../models/FormModel.js";

export const FormController = async (req, res) => {
  try {
    const { Name, email } = req.body;

    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    const existingEmail = await Form.findOne({email});
    if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
    };

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    };

    const formData = {
      Name,
      email,
      File: req.file.path,
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
