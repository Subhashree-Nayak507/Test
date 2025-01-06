import express from 'express';
import {  checkAuth, LoginController, LogoutController, SignupController } from '../controller/AuthController.js';

const AuthRouter = express.Router();

AuthRouter.post('/signup', SignupController);
AuthRouter.post('/login',LoginController);
AuthRouter.post('/logout',LogoutController);
AuthRouter.get('/check-auth',checkAuth);

export default AuthRouter;
