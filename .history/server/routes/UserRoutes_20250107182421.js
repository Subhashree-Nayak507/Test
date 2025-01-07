import express from 'express';
import {  checkAuth, LoginController, LogoutController, SignupController,protectRoute } from '../controller/AuthController.js';
import { protectRoute } from '../middleware/UserMiddleware.js';

const AuthRouter = express.Router();

AuthRouter.post('/signup', SignupController);
AuthRouter.post('/login',LoginController);
AuthRouter.post('/logout',LogoutController);
AuthRouter.get('/check-auth',protectRoute,checkAuth);

export default AuthRouter;
