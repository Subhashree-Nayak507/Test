import User from "../models/UserModel.js";
import { generateTokenAndSetCookie } from "../utils/Token.js";
import bcrypt from 'bcryptjs';

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
            user: {
                id: newUser._id,
                Name: newUser.Name,
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
        const  { Email ,Password } = req.body;

        if ( !Email || !Password){
            return res.status(400).json({
                success:false,
                message:"Please enter all fields"
            });
        };

        const user = await User.findOne({ Email });
        if(!user){
           return res.status(400).json({"message":"Invalid crediantials"});
        };

       const ispassword= await bcrypt.compare(Password,user.Password);

       if(!ispassword){
           return res.status(400).json({"message":"Invalid crediantials"});
        };
       
        generateTokenAndSetCookie(res,user._id);

        res.status(200).json({
           _id:user._id,
           Name:user.Name,
           email:user.Email,
        })

    }catch(e){
        console.log("Error in Login:",e);
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
};

export const logoutController = (req,res) =>{
    try{
       res.cookie("jwt","",{ maxAge:0});
       res.status(200).json({
        success:true,
        message:"Logged out successfully"
    });
    }catch(e){
        console.log("Error in Logout:",e);
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
   }
};