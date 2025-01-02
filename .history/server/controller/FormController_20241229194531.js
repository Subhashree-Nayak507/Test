export const FormController = async(req,res)=>{
     try{


     }catch(e){
        console.log("Error",e);
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
     }
}