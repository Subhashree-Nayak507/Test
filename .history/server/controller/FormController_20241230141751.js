import { FormManager } from "../manager/FormManger.js";

export const FormController = async(req,res)=>{
    console.log('hi');
     try{
        const { Name, email } = req.body;
        const File = req.file;
    
        if (!Name || !email || !File) {
          return res.status(400).json({ message: 'All fields are required.' });
        }
    
        const formData = await FormManager(Name, email, File.path);
        console.log(formData);
        
        res.status(200).json({
            success:true,
            message:"Form submitted successfully",
            
        })
     }catch(e){
        console.log("Error",e);
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        });
     }
}