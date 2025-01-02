import { FormManager } from "../manager/FormManger.js";

export const FormController = async(req,res)=>{
    console.log('hi');
     try{
        const { name, email } = req.body;
        const file = req.file;
    
        if (!name || !email || !file) {
          return res.status(400).json({ message: 'All fields are required.' });
        }
    
        const formData = await FormManager(name, email, file);
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