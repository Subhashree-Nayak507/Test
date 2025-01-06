import express from 'express';
import {  LoginController, SignupController } from '../controller/AuthController.js';
import { protectRoute } from '../middleware/UserMiddleware.js';

const AuthRouter = express.Router();

router.post('/signup', SignupController);
router.post('/login',protectRoute, LoginController);

export default AuthRouter;
