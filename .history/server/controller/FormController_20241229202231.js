export const FormController = async(req,res)=>{
     try{
      const {name, email}= req.body;


        res.status(200).json({
            success:success,
            message:"Form submitted successfully"
        })
     }catch(e){
        console.log("Error",e);
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        });
     }
}