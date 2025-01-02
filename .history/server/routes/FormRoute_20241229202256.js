import express from 'express';
import { FormController } from '../controller/FormController.js';

const router = express.Router();

router.post("/form",FormController);

export default router;