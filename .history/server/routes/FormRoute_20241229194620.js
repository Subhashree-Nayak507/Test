import express from 'express';
import { FormController } from '../controllers/FormController.js';

const router = express.Router();

router.post("/form",FormController);

export default router;