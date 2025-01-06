import express from 'express';
import {  LoginController, logoutController, SignupController } from '../controller/AuthController.js';

const AuthRouter = express.Router();

AuthRouter.post('/signup', SignupController);
AuthRouter.post('/login',LoginController);
AuthRouter.post('/logout',logoutController);

export default AuthRouter;
