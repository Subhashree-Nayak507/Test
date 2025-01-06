import { generateTokenAndSetCookie } from "../utils/Token.js";

export const SignupController = async(req,res)=>{
    try{
        const { Name, Email, Password } = req.body;

        if (!Name || !Email || !Password){
            return res.status(400).json({
                success:false,
                message:"Please enter all fields"
            })
        };

        const existingUser = await User.findOne({Email});
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        };

        // Create new user
        const newUser = new User({
            Name,
            Email,
            Password
        });
        generateTokenAndSetCookie(res,newUser._id);

        await newUser.save();
        
        res.status(201).json({
            success: true,
            token,
            user: {
                id: newUser._id,
                Nameame: newUser.Name,
                Email: newUser.Email
            }
        });
   
    }catch(e){
        console.log("Error in Signup:",e);
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
};

export const LoginController = async(req,res)=>{
    try{

    }catch(e){
        console.log("Error in Login:",e);
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
}