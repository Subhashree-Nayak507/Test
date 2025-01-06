import express from 'express';
import {  LoginController, logoutController, SignupController } from '../controller/AuthController.js';
import { protectRoute } from '../middleware/UserMiddleware.js';

const AuthRouter = express.Router();

router.post('/signup', SignupController);
router.post('/login',LoginController);
router.post('/logout',logoutController);

export default AuthRouter;
