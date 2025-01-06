
import express from 'express';
import { upload }  from '../middleware/FormMiddleware.js';
import {  SignupController } from '../controller/AuthController.js';

const router = express.Router();

router.post('/signup', SignupController);
router.post('/login', LoginController);

export default router;
