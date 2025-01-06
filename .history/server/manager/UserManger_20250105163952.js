import User from "../models/UserModel.js";
import { generateTokenAndSetCookie } from "../utils/Token.js";
import bcrypt from 'bcryptjs';

export const SignupManager = async (Name, Email, Password, res) => {
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        });
    }

    const newUser = new User({
        Name,
        Email,
        Password
    });
    generateTokenAndSetCookie(res, newUser._id);

    await newUser.save();

    res.status(201).json({
        success: true,
        user: {
            id: newUser._id,
            Name: newUser.Name,
            Email: newUser.Email
        }
    });
};

export const LoginManager = async (Email, Password, res) => {
    const user = await User.findOne({ Email });
    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }

    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
        success:true,
        _id: user._id,
        Name: user.Name,
        email: user.Email,
    });
};

export const logoutManager = (res) => {
    res.clearCookie("jwt");
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};
