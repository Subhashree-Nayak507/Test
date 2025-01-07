import { SignupManager, LoginManager, logoutManager } from '../manager/UserManger.js';

export const SignupController = async (req, res) => {
    try {
        const { Name, Email, Password } = req.body;

        if (!Name || !Email || !Password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all fields"
            });
        }

        await SignupManager(Name, Email, Password, res);

    } catch (e) {
        console.log("Error in Signup:", e);
        res.status(500).json({
            success: false,
            message: "Internal server Error"
        });
    }
};

export const LoginController = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all fields"
            });
        }

        await LoginManager(Email, Password, res);

    } catch (e) {
        console.log("Error in Login:", e);
        res.status(500).json({
            success: false,
            message: "Internal server Error"
        });
    }
};

export const LogoutController = (req, res) => {
    try {
        logoutManager(res);
    } catch (e) {
        console.log("Error in Logout:", e);
        res.status(500).json({
            success: false,
            message: "Internal server Error"
        });
    }
};

export const checkAuth = (req, res) => {
    try {
        if (!req.user){
            res.ststus(401).json({
                succcess:false,
                message:"Unauthorized requests"
            })
        }
      res.status(200).json(req.user);
    } catch (e) {
      console.log("Error in checkAuth controller", e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
