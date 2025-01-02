import express from 'express';
import multer from 'multer';
import { FormController } from '../controller/FormController.js';

const router = express.Router();
const upload = multer({ dest: 'public/uploads/' }); 

router.post("/form", upload.single('file'),FormController);

export default router;