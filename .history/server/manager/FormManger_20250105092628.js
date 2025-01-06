import Form from "../models/FormModel.js";


export const saveFormToDatabase = async (formData) => {
  const newForm = new Form(formData); 
  return await newForm.save(); 
};
