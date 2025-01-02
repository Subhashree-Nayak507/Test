import express from 'express';
import { upload } from '../utils/cloudinary.js'; 
import { FormController } from '../controller/FormController.js';

const router = express.Router();

router.post('/form', upload.single('file'), FormController);

export default router;
