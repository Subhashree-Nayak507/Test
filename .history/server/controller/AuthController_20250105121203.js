import { generateTokenAndSetCookie } from "../utils/Token.js";

export const SignupController = async(req,res)=>{
    try{
        const { name, email, password } = req.body;

        if (!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Please enter all fields"
            })
        };

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        };

        // Create new user
        const newUser = new User({
            name,
            email,
            password
        });
        generateTokenAndSetCookie(res,newUser._id)

        await newUser.save();
        
        res.status(201).json({
            success: true,
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
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