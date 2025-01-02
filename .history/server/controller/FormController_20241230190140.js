
export const FormController= async(req,res)=>{
    try{
        const{ Name, email } = req.body;
        const fileUrl = req.file.path;
        const newForm = new Form({
            Name,
            email,
            File:fileUrl
        });
        await newForm.save();
        res.status(201).json({
            message:"form submitted"
        });
    }catch(e){
        console.log(e);
    }
}