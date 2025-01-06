import express from 'express';
import {  LoginController, LogoutController, SignupController } from '../controller/AuthController.js';

const AuthRouter = express.Router();

AuthRouter.post('/signup', SignupController);
AuthRouter.post('/login',LoginController);
AuthRouter.post('/logout',LogoutController);

export default AuthRouter;
