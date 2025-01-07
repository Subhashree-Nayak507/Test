import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

export const protectRoute = async(req,res,next)=>{
    try{
      // Add this debugging middleware right before your protectRoute middleware
  console.log('\n=== Debug Request Info ===');
  console.log('Request URL:', req.url);
  console.log('Request Method:', req.method);
  console.log('All Cookies:', req.cookies);
  console.log('JWT Cookie Specifically:', req.cookies.jwt);
  console.log('Cookie Header:', req.headers.cookie);
  console.log('All Headers:', req.headers);

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