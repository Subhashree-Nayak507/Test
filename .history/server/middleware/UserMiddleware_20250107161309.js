import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

export const protectRoute = async(req,res,next)=>{
    try{
      const token = req.cookies.jwt;
      console.log("Cookies: ", req.cookies); // Check if jwt is in the cookies

      console.log("token:",token);
      if(!token){
        return res.status(401).json({"message":"unauthorized request"});
      }

      const decoded= jwt.verify(token,process.env.JWT_SECRET);
      if(!decoded){
        return res.status(401).json({"message":"token is invalid"});
      }

      const user= await User.findById(decoded.userId).select("-password");
      if(!user){
        return res.status(401).json({"message":"User not found"});
      }

      req.user = user;
      next();

    }catch(e){
     console.log("Error",e);
     res.status(500).json({"message":"Internal server Error"});
    }
}