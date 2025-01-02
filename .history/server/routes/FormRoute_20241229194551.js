import express from 'express';
import { FormController } from '../controllers/FormController.js';


const router = express.Router();

router.post("/signup",FormController);

export default router;