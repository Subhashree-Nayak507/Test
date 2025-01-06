import express from 'express';
import {  LoginController, SignupController } from '../controller/AuthController.js';

const AuthRouter = express.Router();

router.post('/signup', SignupController);
router.post('/login', LoginController);

export default AuthRouter;
